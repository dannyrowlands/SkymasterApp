
export function setAuth(auth) {
    console.log('AUTH::', auth)
    localStorage.setItem('token', auth.token);
    localStorage.setItem('refreshToken', auth.refreshToken);
}

function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

function getToken() {
    return localStorage.getItem('token');
}

function isLoggedIn() {
    return getToken() && getRefreshToken();
}

function isTokenExpired() {
    const decoded = jwt_decode(getToken());
    return decoded.exp < Date.now() / 1000 + 60 * 5;
}

export async function refreshToken() {
    if (!isLoggedIn()) {
        return;
    }

    if (isTokenExpired()) {
        console.log('REFRESHING TOKEN')
        const response = await postRequest(config.auth.refresh_route, {refreshToken: getRefreshToken()});
        if (response.ok) {
            console.log('TOKEN REFRESHED')
            setAuth(await response.json());
        }
    }
}





let dbConnectionPromise;
function getDb() {
    if (dbConnectionPromise) {
        return dbConnectionPromise;
    }
    dbConnectionPromise = DbClient.connect(options);
    return dbConnectionPromise;
}

// partition worker using singleton.
const writeSomeTheThings = async (someThings) => {
    const db = await getDb();
    await writeThings(db, someThings);
};

// parallel writer.
const writeAllOfTheThings = (allThings) =>
    Promise.all(getSome(allThings).map(writeSomeTheThings));
