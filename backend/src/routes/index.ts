import ApiVersion from "../enum/apiVersion"
import jsonPackage from "../../package.json"

/**
 * Behavior for the index route
 * @returns {ApiVersion} - Returns the version of the API
 */
const index = async (): Promise<ApiVersion> => {
    return {
        version: jsonPackage.version,
        versionName: jsonPackage.versionName
    }
}

export default index;