import CONFIG from '@config/config.json'

const getAllCompilations = async (locale) => {
    const CMSConfigAPI = CONFIG.api.cms || 'http://localhost:1337'
    const res = await fetch(
        `${CMSConfigAPI}/api/compilations/?locale=${locale}&populate=oforms`,
    )
    const data = await res.json()
    data.data = data.data.filter(compilation => {
        return compilation.attributes.oforms.data.length !== 0
    })
    return data
}

export default getAllCompilations
