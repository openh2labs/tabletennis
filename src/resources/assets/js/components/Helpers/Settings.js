/**
 *
 * class that returns setting value from db
 *
 * @param var_name
 * @returns {Promise<Response>}
 * @constructor
 */

const Settings = (var_name) => {
    return (
        fetch( 'api/settings/' + var_name, {
            method:'get',
            /* headers are important*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: ''
        })
    );
}

export default Settings;