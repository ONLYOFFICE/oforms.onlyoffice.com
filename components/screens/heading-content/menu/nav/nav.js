import Link from "@components/common/link";
import Input from "@components/common/text-input"
import Box from "./sub-components/box";
import MenuItem from "../menu-item";
import StyledNav from "./styled-nav";
import {useState} from "react";
import {useRouter} from "next/router";

const Nav = ({onClick, t, stateMobilePND, currentLanguage, ...rest}) => {
    const [value, setValue] = useState('');
    const router = useRouter()
    const hrefLang = `https://onlyoffice.com${
        currentLanguage === "en" ? "" : `/${currentLanguage}`
    }`;

    const onSearch = (e) => {
        if(e.key == 'Enter') {
            router.push(`/searchresult?query=${value}`)
        }
    }
    return (
        <StyledNav stateMobile={stateMobilePND} {...rest}>
            <Box className="menu-box">
                <Box className="menu-items-box">
                    <MenuItem heading={t("Products")} id="navitem_products">
                        <Box className="menu-wrapper">
                            <Box className="outer-box with-border">

                                <Box className="link-wrapper">
                                    <Link
                                        href={`${hrefLang}/office-suite.aspx`}
                                        className="dropdown-item"
                                        id="navitem_products_docs"
                                    >
                                        {t("Docs")}
                                    </Link>
                                    Editors to integrate into your business platform
                                </Box>

                                <Box className="link-wrapper">
                                    <Link
                                        href={`${hrefLang}/docspace.aspx`}
                                        className="dropdown-item"
                                        id="navitem_products_docspace"
                                    >
                                        {t("DocSpace")}
                                    </Link>
                                    Platform to collaborate with your partners and clients
                                </Box>

                                <Box className="link-wrapper">
                                    <Link
                                        href={`${hrefLang}/workspace.aspx`}
                                        className="dropdown-item"
                                        id="navitem_products_workspace"
                                    >
                                        {t("Workspace")}
                                    </Link>
                                    Platform to collaborate with your team
                                </Box>

                                <Box className="link-wrapper">
                                    <Link
                                        href={`${hrefLang}/all-connectors.aspx`}
                                        className="dropdown-item"
                                        id="navitem_products_connectors"
                                    >
                                        {t("Connectors")}
                                    </Link>
                                    Ready-to-use apps to integrate Docs with your platform
                                </Box>

                            </Box>
                            <Box className="outer-box with-border">
                                <Link
                                    id="navitem_product_desktop_mob_apps"
                                    className="dropdown-item mobile-no-link"
                                >
                                    {t("Desktop&mobile apps")}
                                </Link>
                                <Link
                                    id="navitem_product_clients_apps"
                                    href={`${hrefLang}/desktop.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("For desktop")}
                                </Link>
                                <Link
                                    id="navitem_product_clients_mobile_ios"
                                    href={`${hrefLang}/office-for-ios.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("For iOS")}
                                </Link>
                                <Link
                                    id="navitem_product_clients_mobile_android"
                                    href={`${hrefLang}/office-for-android.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("For Android")}
                                </Link>
                            </Box>
                            <Box className="outer-box">
                                <Link
                                    id="navitem_product_perform_your_tasks_online"
                                    className="dropdown-item mobile-no-link"
                                >
                                    {t("Perform your tasks online")}
                                </Link>
                                <Link
                                    id="navitem_product_find_and_fill_out_oforms"
                                    href={`https://oforms.onlyoffice.com/${currentLanguage}`}
                                    className="dropdown-item"
                                >
                                    {t("Find and fill out oforms")}
                                </Link>
                                <Link
                                    id="navitem_product_convert_text_files"
                                    href={`${hrefLang}/text-file-converter.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Convert text files")}
                                </Link>
                                <Link
                                    id="navitem_product_convert_spreadsheets"
                                    href={`${hrefLang}/spreadsheet-converter.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Convert spreadsheets")}
                                </Link>
                                <Link
                                    id="navitem_product_convert_presentations"
                                    href={`${hrefLang}/presentation-converter.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Convert presentations")}
                                </Link>
                                <Link
                                    id="navitem_product_convert_pdfs"
                                    href={`${hrefLang}/pdf-converter.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Convert PDFs")}
                                </Link>
                            </Box>
                        </Box>
                    </MenuItem>

                    <MenuItem
                        heading={t("Enterprise")}
                        id="navitem_enterprise"
                        href={`https://www.onlyoffice.com/${currentLanguage}/for-enterprises.aspx`}
                    />

                    <MenuItem heading={t("Developers")} id="navitem_dev">
                        <Box className="menu-wrapper menu-wrapper_dev">
                            <Box className="outer-box">
                                <Link
                                    id="navitem_dev_docs_developer"
                                    href={`${hrefLang}/developer-edition.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Docs Developer")}
                                </Link>
                                <Link
                                    id="navitem_dev_conversion_api"
                                    href={`${hrefLang}/conversion-api.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Conversion API")}
                                </Link>
                                <Link
                                    id="navitem_dev_document_builder"
                                    href={`${hrefLang}/document-builder.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Document builder")}
                                </Link>
                                <Link
                                    id="navitem_dev_api_documentation"
                                    href={`https://api.onlyoffice.com/${currentLanguage}`}
                                    className="dropdown-item"
                                >
                                    {t("API Documentation")}
                                </Link>
                                <Link
                                    id="navitem_dev_pricing"
                                    href={`${hrefLang}/developer-edition-prices.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Pricing")}
                                </Link>
                                <Link
                                    id="navitem_dev_get_it_now"
                                    href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-developer`}
                                    className="dropdown-item"
                                >
                                    {t("Get It Now")}
                                </Link>
                            </Box>
                            <Box className="outer-box gray">
                                <Link
                                    href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-developer`}
                                    className="link-wrapper-with-img"
                                >
                                    <Link
                                        id="navitem_dev_see_it_in_action"
                                        className="link-wrapper-with-img_link"
                                    >
                                        {t("See it in action")}
                                    </Link>
                                    <Box className="link-wrapper-with-img_img" id="see_it_in_action"/>
                                    <Link
                                        id="navitem_dev_see_it_in_action"
                                    >
                                        {t("Curious to know what the interface looks like and try the main functionality?")}
                                    </Link>
                                </Link>
                            </Box>
                        </Box>
                    </MenuItem>

                    <MenuItem heading={t("Get Onlyoffice")} id="navitem_get_onlyoffice">
                        <Box className="menu-wrapper">
                            <Box className="outer-box with-border">
                                <Link
                                    className="dropdown-item mobile-no-link"
                                    id="navitem_get_onlyoffice_for_business"
                                >
                                    {t("For business")}
                                </Link>
                                <Box className="second-link-wrapper">
                                    <Link
                                        id="navitem_get_onlyoffice_docspace"
                                        className="dropdown-item"
                                    >
                                        {t("DocSpace")}
                                    </Link>
                                    <Link
                                        id="navitem_get_onlyoffice_sign_up_for_cloud"
                                        className="second-link-wrapper_link"
                                        href={`${hrefLang}/docspace-registration.aspx`}
                                    >
                                        {t("Sign up for cloud")}
                                    </Link>
                                </Box>
                                <Box className="second-link-wrapper">
                                    <Link
                                        id="navitem_get_onlyoffice_docs_enterprise"
                                        className="dropdown-item"
                                    >
                                        {t("Docs Enterprise")}
                                    </Link>
                                    <Link
                                        id="navitem_get_onlyoffice_sign_up_for_cloud"
                                        className="second-link-wrapper_link"
                                        href={`${hrefLang}/docs-registration.aspx`}
                                    >
                                        {t("Sign up for cloud")}
                                    </Link>
                                    <Link
                                        id="navitem_get_onlyoffice_sign_up_for_cloud"
                                        className="second-link-wrapper_link"
                                        href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-enterprise`}
                                    >
                                        {t("Install on-premises")}
                                    </Link>
                                </Box>
                                <Box className="second-link-wrapper">
                                    <Link
                                        id="navitem_get_onlyoffice_workspace"
                                        className="dropdown-item"
                                    >
                                        {t("Workspace")}
                                    </Link>
                                    <Box className="second-link-wrapper_twins">
                                        <Link
                                            id="navitem_get_onlyoffice_sign_in"
                                            className="second-link-wrapper_link"
                                            href={`${hrefLang}/signin.aspx`}
                                        >
                                            {t("Sign in")}
                                        </Link>/
                                        <Link
                                            id="navitem_get_onlyoffice_sign_up_for_cloud"
                                            className="second-link-wrapper_link"
                                            href={`${hrefLang}/registration.aspx`}
                                        >
                                            {t("Sign up for cloud")}
                                        </Link>
                                    </Box>
                                    <Link
                                        id="navitem_get_onlyoffice_sign_up_for_cloud"
                                        className="second-link-wrapper_link"
                                        href={`${hrefLang}/download-workspace.aspx`}
                                    >
                                        {t("Install on-premises")}
                                    </Link>
                                </Box>
                                <Link
                                    className="dropdown-item"
                                    id="navitem_get_only_office_connectors"
                                    href={`${hrefLang}/download-connectors.aspx`}
                                >
                                    {t("Connectors")}
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    id="navitem_get_only_office_download_desktop"
                                    href={`${hrefLang}/download-desktop.aspx`}
                                >
                                    {t("Desktop&mobile apps")}
                                </Link>
                            </Box>
                            <Box className="outer-box-wrapper">
                                <Box className="outer-box with-horizontal-border">
                                    <Link
                                        className="dropdown-item mobile-no-link"
                                        id="navitem_get_onlyoffice_for_dev"
                                    >
                                        {t("For developers")}
                                    </Link>
                                    <Box className="second-link-wrapper">
                                        <Link
                                            id="navitem_get_onlyoffice_docs_dev"
                                            className="dropdown-item"
                                        >
                                            {t("Docs Developer")}
                                        </Link>
                                        <Link
                                            id="navitem_get_onlyoffice_sign_up_for_cloud"
                                            className="second-link-wrapper_link"
                                            href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-developer`}
                                        >
                                            {t("Install on-premises")}
                                        </Link>
                                    </Box>
                                    <Link
                                        id="navitem_get_onlyoffice_docs_builder"
                                        className="dropdown-item"
                                        href={`${hrefLang}/download-builder.aspx`}
                                    >
                                        {t("Document builder")}
                                    </Link>
                                </Box>
                                <Box className="outer-box">
                                    <Link
                                        className="dropdown-item mobile-no-link"
                                        id="navitem_get_onlyoffice_for_dev"
                                    >
                                        {t("For community")}
                                    </Link>
                                    <Link
                                        id="navitem_get_onlyoffice_docs_community"
                                        className="dropdown-item"
                                        href={`${hrefLang}/download-docs.aspx#docs-community`}
                                    >
                                        {t("Docs Community")}
                                    </Link>
                                    <Link
                                        id="navitem_get_onlyoffice_code_git"
                                        className="dropdown-item"
                                        href={`https://github.com/ONLYOFFICE/`}
                                    >
                                        {t("Code on GitHub")}
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </MenuItem>

                    <MenuItem heading={t("Pricing")} id="navitem_prices">
                        <Box className="menu-wrapper menu-wrapper_pricing">
                            <Box className="outer-box gap38">
                                <Box className="inner-box with-border">
                                    <Link
                                        className="dropdown-item mobile-no-link"
                                        id="navitem_prices_for_business"
                                    >
                                        {t("For business")}
                                    </Link>
                                    <Link
                                        id="navitem_prices_docspace"
                                        className="dropdown-item"
                                        href={`${hrefLang}/docspace-prices.aspx`}
                                    >
                                        {t("DocSpace")}
                                    </Link>
                                    <Link
                                        id="navitem_prices_docs_enterprice"
                                        href={`${hrefLang}docs-enterprise-prices.aspx`}
                                        className="dropdown-item"
                                    >
                                        {t("Docs Enterprise")}
                                    </Link>
                                    <Link
                                        id="navitem_prices_workspace"
                                        href={`${hrefLang}/workspace-prices.aspx`}
                                        className="dropdown-item"
                                    >
                                        {t("Workspace")}
                                    </Link>
                                </Box>
                                <Box className="inner-box">
                                    <Link
                                        className="dropdown-item mobile-no-link"
                                        id="navitem_prices_for_dev"
                                    >
                                        {t("For developers")}
                                    </Link>
                                    <Link
                                        id="navitem_prices_docs_dev"
                                        href={`${hrefLang}/developer-edition-prices.aspx`}
                                        className="dropdown-item"
                                    >
                                        {t("Docs Developer")}
                                    </Link>
                                </Box>
                            </Box>

                            <Box className="outer-box gray">
                                <Link
                                    href={`${hrefLang}/find-partners.aspx`}
                                    className="link-wrapper-with-img"
                                >
                                    <Link
                                        id="navitem_dev_see_it_in_action"
                                        className="link-wrapper-with-img_link"
                                    >
                                        {t("Buy from an ONLYOFFICE partner")}
                                    </Link>
                                    <Box className="link-wrapper-with-img_img" id="reseller"/>
                                    <Link
                                        id="navitem_dev_see_it_in_action"
                                    >
                                        {t("Curious to know what the interface looks like and try the main functionality?")}
                                    </Link>
                                </Link>
                            </Box>
                        </Box>
                    </MenuItem>

                    <MenuItem heading={t("Partners")} id="navitem_partners">
                        <Box className="menu-wrapper menu-wrapper_partners">
                            <Box className="outer-box">
                                <Link
                                    id="navitem_partners_resellers"
                                    href={`${hrefLang}/resellers.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Resellers")}
                                </Link>
                                <Link
                                    id="navitem_partners_hosters"
                                    href={`${hrefLang}/affiliates.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Affiliates")}
                                </Link>
                                <Link
                                    id="navitem_partners_providers"
                                    href={`${hrefLang}/hosting-providers.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Hosting providers")}
                                </Link>
                                <Link
                                    id="navitem_partners_technology_partners"
                                    href={`${hrefLang}/technology-partners.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Technology Partners")}
                                </Link>
                                <Link
                                    id="navitem_partners_find_partners"
                                    href={`${hrefLang}/find-partners.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Find partners")}
                                </Link>
                                <Link
                                    id="navitem_partners_submit_request"
                                    href={`${hrefLang}/partnership-request.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Submit request")}
                                </Link>
                            </Box>
                            <Box className="outer-box gray">
                                <Link
                                    href={`${hrefLang}/find-partners.aspx`}
                                    className="link-wrapper-with-img"
                                >
                                    <Link
                                        id="navitem_dev_see_it_in_action"
                                        className="link-wrapper-with-img_link"
                                    >
                                        {t("Events")}
                                    </Link>
                                    <Box className="link-wrapper-with-img_img" id="events"/>
                                    <Link
                                        id="navitem_dev_see_it_in_action"
                                    >
                                        {t("Meet the ONLYOFFICE team")}
                                    </Link>
                                </Link>
                            </Box>
                        </Box>
                    </MenuItem>

                    <MenuItem heading={t("Resources")} id="navitem_resources">
                        <Box className="menu-wrapper">
                            <Box className="outer-box with-border without-border-on-mobile without-pb-on-mobile">
                                <Link
                                    id="navitem_resources_about"
                                    href={`${hrefLang}/about.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("About ONLYOFFICE")}
                                </Link>
                                <Link
                                    id="navitem_resources_customers"
                                    href={`${hrefLang}/customers.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Customers")}
                                </Link>
                                <Link
                                    id="navitem_resources_contribute"
                                    href={`${hrefLang}/contribute.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Contribute")}
                                </Link>
                                <Link
                                    id="navitem_resources_vacancies"
                                    href={`${hrefLang}/vacancies.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Jobs")}
                                </Link>
                                <Link
                                    id="navitem_resources_awards"
                                    href={`${hrefLang}/awards.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Awards")}
                                </Link>
                                <Link
                                    id="navitem_resources_events"
                                    href={`${hrefLang}/events.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Events")}
                                </Link>
                                <Link
                                    id="navitem_resources_giftshop"
                                    href="https://shop.spreadshirt.com/onlyoffice"
                                    className="dropdown-item"
                                >
                                    {t("Gift shop")}
                                </Link>
                                <Link
                                    id="navitem_resources_contacts"
                                    href={`${hrefLang}/contacts.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Contacts")}
                                </Link>
                            </Box>
                            <Box className="outer-box">
                                <Link
                                    id="navitem_resources_blog"
                                    href="https://www.onlyoffice.com/blog/"
                                    className="dropdown-item"
                                >
                                    {t("Blog")}
                                </Link>
                                <Link
                                    id="navitem_resources_forum"
                                    href="https://forum.onlyoffice.com/"
                                    className="dropdown-item"
                                >
                                    {t("Forum")}
                                </Link>
                                <Link
                                    id="navitem_resources_pressdownloads"
                                    href={`${hrefLang}/press-downloads.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Press downloads")}
                                </Link>
                                <Link
                                    id="navitem_resources_help"
                                    href="https://helpcenter.onlyoffice.com/index.aspx"
                                    className="dropdown-item"
                                >
                                    {t("Help Center")}
                                </Link>
                                <Link
                                    id="navitem_resources_whitepapers"
                                    href={`${hrefLang}/whitepapers.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("White papers")}
                                </Link>
                                <Link
                                    id="navitem_resources_webinars"
                                    href={`${hrefLang}/webinars.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Webinars")}
                                </Link>
                                <Link
                                    id="navitem_resources_training_courses"
                                    href={`${hrefLang}/training-courses.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Training courses")}
                                </Link>
                                <Link
                                    id="navitem_resources_compare"
                                    href={`${hrefLang}/training-courses.aspx`}
                                    className="dropdown-item"
                                >
                                    {t("Compare to other suites")}
                                </Link>
                            </Box>
                        </Box>
                    </MenuItem>
                </Box>
                <Box className="input-wrapper">
                    <Input
                        className="menu-input"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={t('Search on site')}
                        height="40px"
                        onEnterPress={onSearch}
                    />
                </Box>
            </Box>
            <Box className="phone_wrapper">
                <Link className="nav-item-mobile-tel" href="tel:+371 660 164 25">
                    +371 660 164 25
                </Link>
            </Box>
        </StyledNav>
    )
};

export default Nav;