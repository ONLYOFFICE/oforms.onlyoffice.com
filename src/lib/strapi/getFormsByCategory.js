import CONFIG from '@config/config.json';

const getFormsByCategory = async (props) => {
    const {
        locale,
        sort,
        pageSize,
        page,
        categoryName,
        categoryValue,
    } = props;

    const res = await fetch(
        `${CONFIG.api.cms}/api/oforms/?filters[${categoryName}][urlReq][$eq]=${categoryValue}&locale=${locale === 'pt' ? 'pt-br' : locale}&sort=name_form:${sort}&${pageSize ? `&pagination[pageSize]=${pageSize}` : ''}&pagination[page]=${page}&populate=file_oform&populate=card_prewiew`,
    );

    return await res.json();
};

export default getFormsByCategory;
