import {Img} from "@common/image";
import Text from "@common/text";
import {Card} from "@common/card";
import StyledCards from "./styled-cards";
import {useRouter} from "next/router";
import {Empty} from "@common/empty";
import {useMemo} from "react";
import {useTranslation} from "next-i18next";

const Cards = ({
                   data,
                   typeSortData,
                   currentLanguage,
                   groupCheckboxIsOpen,
                   handlerSetModal,
                   handlerCardData,
                   searchResults,
                   ...rest
               }) => {
    const router = useRouter()
    const isDesktopClient = router.query.desktop;
    const theme = router.query.theme
    const { t } = useTranslation('common')

    const onClear = () => {
        if (theme) {
            router.push({
                pathname: '/',
                query: {
                    desktop: true,
                    theme,
                }
            })
        } else {
            router.push({
                pathname: '/',
                query: {
                    desktop: true,
                }
            })
        }
    }

    return (
        <div
            className={`tempalates-cards-items ${data?.length === undefined || 0 ? "no-more-result-items" : ""}`} {...rest}>
            <StyledCards className="cards" groupCheckboxIsOpen={groupCheckboxIsOpen}>
                {
                    data?.length > 0 ? (
                        data?.map((it, id) => (
                            <Card
                                className="card"
                                key={id}
                                arrayItems={it}
                                currentLanguage={currentLanguage}
                                isDesktopClient={isDesktopClient}
                                handlerSetModal={handlerSetModal}
                                handlerCardData={handlerCardData}
                            />
                        ))
                    ) : data?.length === 0 ? (
                        isDesktopClient ? <Empty onClear={onClear}/> :
                            <div className="no-more-result-block">
                                <Img
                                    src="https://static-oforms.teamlab.info/icons/bg-errors.react.svg"
                                    className="no-more-result-image"
                                    alt="No more results"
                                />
                                <Text className="no-more-result-heading" label={t("No more results...")}/>
                            </div>
                    ) : (
                        data?.map((it, id) => (
                            <Card
                                className="card"
                                key={id}
                                arrayItems={it}
                                currentLanguage={currentLanguage}
                                isDesktopClient={isDesktopClient}
                                handlerSetModal={handlerSetModal}
                                handlerCardData={handlerCardData}
                            />
                        ))
                    )
                }
            </StyledCards>
        </div>
    );
};

export default Cards;
