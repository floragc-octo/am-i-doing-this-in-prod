// CONSTANTS
const DEFAULT_CONFIG = [
    {
        id: "a1",
        site: "passculture-staging.beta.gouv.fr/",
        color: "#00eeee",
        label: "staging",
    },
    {
        id: "a2",
        site: "passculture-testing.beta.gouv.fr/",
        color: "#ee00ee",
        label: "testing",
    },
    {
        id: "a3",
        site: "passculture.beta.gouv.fr/",
        color: "#ee0000",
        label: "production",
    }
]

// INIT for storage
const store = chrome.storage.sync
