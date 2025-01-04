module.exports = {
    apps: [
        {
            name: "quran-player",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3000,
                BASE_PATH: "/projects/quran-player",
            },
        },
    ],
};
