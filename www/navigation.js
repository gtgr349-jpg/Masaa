/* =========================================================
   Ù…ÙŽØ³Ù’Ø¹ÙŽÙ‰ â€” CENTRAL NAVIGATION MANAGER
   Version 1.0

   Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ Ø¹Ù†:
   - Ø§Ù„ØªÙ†Ù‚Ù„ Ø¨ÙŠÙ† Ø£Ù‚Ø³Ø§Ù… Ø§Ù„ØªØ·Ø¨ÙŠÙ‚
   - History
   - Ø²Ø± Back ÙÙŠ Ø§Ù„Ù‡Ø§ØªÙ
   - Refresh Ø¹Ù„Ù‰ Ù†ÙØ³ Ø§Ù„ØµÙØ­Ø©
   - Ø§Ù„ØªÙ†Ù‚Ù„ Ø¯Ø§Ø®Ù„ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
   - Home Ù…Ù† Ø£ÙŠ Ù…ÙƒØ§Ù†
   - Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø§Ù„Ù…Ø¨Ø§Ø´Ø± Ø¥Ù„Ù‰ Ù‚Ø³Ù… Ù…Ø­Ø¯Ø¯
   - Routes Ø¯Ø§Ø®Ù„ Ø§Ù„Ø£Ø¯Ø¹ÙŠØ© ÙˆØ§Ù„Ù‚Ø±Ø¢Ù† ÙˆØ§Ù„Ø¹Ù…Ø±Ø© ÙˆØºÙŠØ±Ù‡Ø§

   Ù…Ù„Ø§Ø­Ø¸Ø©:
   Ù‡Ø°Ø§ Ø§Ù„Ù…Ù„Ù Ù„Ø§ ÙŠÙ‚ÙˆÙ… Ø¨Ø±Ø³Ù… Ø§Ù„ØµÙØ­Ø§Øª.
   Ø§Ù„Ù…Ù„ÙØ§Øª Ø§Ù„Ø£Ø®Ø±Ù‰ ØªØ®Ø¨Ø±Ù‡ ÙÙ‚Ø· Ø¨Ø§Ù„Ù…ÙƒØ§Ù† Ø§Ù„Ù…Ø·Ù„ÙˆØ¨ØŒ
   ÙˆÙ‡Ùˆ ÙŠØªÙˆÙ„Ù‰ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù€ History.
   ========================================================= */

(function () {
    "use strict";

    const VERSION = "1.0";

    const baseUrl =
        window.location.pathname +
        window.location.search;

    /*
     * Ø§Ù„Ø£Ù‚Ø³Ø§Ù… Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ© ÙÙŠ Ù…ÙŽØ³Ù’Ø¹ÙŽÙ‰
     */
    const SECTIONS = {
        home: {
            route: "home",
            hash: ""
        },

        duas: {
            route: "duas",
            hash: "#duas"
        },

        quran: {
            route: "quran",
            hash: "#quran"
        },

        umrah: {
            route: "umrah",
            hash: "#umrah"
        },

        hadith: {
            route: "hadith",
            hash: "#hadith"
        },

        nasheeds: {
            route: "nasheeds",
            hash: "#nasheeds"
        },

        journey: {
            route: "journey",
            hash: "#journey"
        },

        memories: {
            route: "memories",
            hash: "#memories"
        },

        rating: {
            route: "rating",
            hash: "#rating"
        },

        settings: {
            route: "settings",
            hash: "#settings"
        }
    };

    /*
     * Ù…Ø³ØªÙ…Ø¹Ùˆ Ø§Ù„ØªÙ†Ù‚Ù„
     *
     * Ø§Ù„Ù…Ù„ÙØ§Øª Ø§Ù„Ø£Ø®Ø±Ù‰ Ø³ØªØ³Ø¬Ù„ Ù†ÙØ³Ù‡Ø§ Ù‡Ù†Ø§
     * Ù„Ù…Ø¹Ø±ÙØ© Ø£Ù† Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø§Ù†ØªÙ‚Ù„ Ø¥Ù„Ù‰ Route Ø¬Ø¯ÙŠØ¯.
     */
    const listeners = new Set();

    /*
     * Ø­Ù…Ø§ÙŠØ© Ù…Ù† ØªÙƒØ±Ø§Ø± Ù…Ø¹Ø§Ù„Ø¬Ø© Ù†ÙØ³ Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„
     */
    let isHandlingNavigation = false;

    /*
     * Ø¥Ù†Ø´Ø§Ø¡ State Ù…ÙˆØ­Ø¯
     */
    function createState(route, data) {
        return {
            masaaNavigation: true,
            masaaNavigationVersion: VERSION,
            masaaRoute: route,
            ...(data || {})
        };
    }

    /*
     * Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† State
     */
    function normalizeState(state) {

        if (!state || typeof state !== "object") {
            return null;
        }

        if (!state.masaaNavigation) {
            return null;
        }

        if (!state.masaaRoute) {
            return null;
        }

        return state;
    }

    /*
     * Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø±Ø§Ø¨Ø·
     */
    function buildUrl(hash) {
        return baseUrl + (hash || "");
    }

    /*
     * Ø¥Ø¹Ù„Ø§Ù… Ø§Ù„Ù…Ù„ÙØ§Øª Ø§Ù„Ø£Ø®Ø±Ù‰ Ø¨Ø­Ø¯ÙˆØ« Navigation
     */
    function notify(state, action) {

        const normalizedState =
            normalizeState(state);

        listeners.forEach(function (listener) {

            try {

                listener(
                    normalizedState,
                    action
                );

            } catch (error) {

                console.error(
                    "Ù…ÙŽØ³Ù’Ø¹ÙŽÙ‰ Navigation listener error:",
                    error
                );

            }

        });
    }

    /*
     * Ø¥Ø¶Ø§ÙØ© Route Ø¬Ø¯ÙŠØ¯ Ø¥Ù„Ù‰ History
     */
    function push(route, data, hash) {

        const state =
            createState(route, data);

        history.pushState(
            state,
            "",
            buildUrl(hash)
        );

        notify(state, "push");

        return state;
    }

    /*
     * Ø§Ø³ØªØ¨Ø¯Ø§Ù„ Route Ø§Ù„Ø­Ø§Ù„ÙŠ
     */
    function replace(route, data, hash) {

        const state =
            createState(route, data);

        history.replaceState(
            state,
            "",
            buildUrl(hash)
        );

        notify(state, "replace");

        return state;
    }

    /*
     * Ø§Ù„Ø±Ø¬ÙˆØ¹ Ø®Ø·ÙˆØ© ÙˆØ§Ø­Ø¯Ø©
     *
     * Ù…Ù‡Ù…:
     * Ù„Ø§ Ù†Ø³ØªØ®Ø¯Ù… history.go(-2)
     * ÙˆÙ„Ø§ history.go(-(index + 3))
     */
    function back() {
        history.back();
    }

    /*
     * Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©
     *
     * Ø¹Ù†Ø¯ Ø§Ù„Ø¶ØºØ· Ø¹Ù„Ù‰ Ø²Ø± Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©:
     * ÙŠØªÙ… Ø¬Ø¹Ù„ Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø­Ø§Ù„ÙŠØ© Ù‡ÙŠ Home.
     *
     * Ù„Ø§ Ù†Ù‚ÙˆÙ… Ø¨Ø¹Ù…Ù„ push Ù„Ù…Ø³Ø§Ø± Home Ø¬Ø¯ÙŠØ¯ ÙÙˆÙ‚
     * Ø§Ù„Ù…Ø³Ø§Ø± Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠ Ø­ØªÙ‰ Ù„Ø§ ØªØªÙƒÙˆÙ† Ø³Ù„Ø³Ù„Ø© Ø±Ø¬ÙˆØ¹ ØºØ±ÙŠØ¨Ø©.
     */
    function home() {

        const state =
            createState("home");

        history.replaceState(
            state,
            "",
            buildUrl("")
        );

        notify(state, "home");

        /*
         * Ø¥Ø±Ø³Ø§Ù„ popstate ÙŠØ¯ÙˆÙŠÙ‹Ø§ Ø­ØªÙ‰ ØªÙ‚ÙˆÙ…
         * ÙˆØ§Ø¬Ù‡Ø© Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¨Ø¹Ø±Ø¶ Home ÙÙˆØ±Ù‹Ø§.
         */
        window.dispatchEvent(
            new PopStateEvent(
                "popstate",
                {
                    state: state
                }
            )
        );
    }

    /*
     * Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø¥Ù„Ù‰ Ù‚Ø³Ù… Ø±Ø¦ÙŠØ³ÙŠ
     */
    function goToSection(section) {

        const config =
            SECTIONS[section];

        if (!config) {

            console.warn(
                "Ù…ÙŽØ³Ù’Ø¹ÙŽÙ‰ Navigation: Ù‚Ø³Ù… ØºÙŠØ± Ù…Ø¹Ø±ÙˆÙ:",
                section
            );

            return null;
        }

        return push(
            config.route,
            {
                section: section
            },
            config.hash
        );
    }

    /*
     * Ø§Ø®ØªØµØ§Ø±Ø§Øª Ø§Ù„Ø£Ù‚Ø³Ø§Ù… Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©
     */

    function goToDuas() {
        return goToSection("duas");
    }

    function goToQuran() {
        return goToSection("quran");
    }

    function goToUmrah() {
        return goToSection("umrah");
    }

    function goToHadith() {
        return goToSection("hadith");
    }

    function goToNasheeds() {
        return goToSection("nasheeds");
    }

    function goToJourney() {
        return goToSection("journey");
    }

    function goToMemories() {
        return goToSection("memories");
    }

    function goToRating() {
        return goToSection("rating");
    }

    function goToSettings() {
        return goToSection("settings");
    }

    /*
     * =====================================================
     * Ø§Ù„Ø£Ø¯Ø¹ÙŠØ©
     * =====================================================
     */

    /*
     * Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø¥Ù„Ù‰ ØªØµÙ†ÙŠÙ Ø£Ø¯Ø¹ÙŠØ©
     *
     * Ù…Ø«Ø§Ù„:
     * #duas-category-travel
     */
    function goToDuaCategory(categoryId) {

        if (!categoryId) {
            return null;
        }

        return push(
            "duas-category",
            {
                section: "duas",
                category: categoryId
            },
            "#duas-category-" +
            encodeURIComponent(categoryId)
        );
    }

    /*
     * Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø¥Ù„Ù‰ Ø¯Ø¹Ø§Ø¡ Ù…Ø­Ø¯Ø¯
     *
     * Ù…Ø«Ø§Ù„:
     * #dua-travel-0
     * #dua-travel-1
     * #dua-travel-2
     */
    function goToDua(categoryId, index) {

        if (!categoryId) {
            return null;
        }

        const safeIndex =
            Number(index);

        if (
            !Number.isInteger(safeIndex) ||
            safeIndex < 0
        ) {
            return null;
        }

        return push(
            "duas-reader",
            {
                section: "duas",
                category: categoryId,
                index: safeIndex
            },
            "#dua-" +
            encodeURIComponent(categoryId) +
            "-" +
            safeIndex
        );
    }

    /*
     * Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ù„Ù„Ø¯Ø¹Ø§Ø¡ Ø§Ù„ØªØ§Ù„ÙŠ
     *
     * Ù‡Ø°Ù‡ Ù…Ø¬Ø±Ø¯ Ø¯Ø§Ù„Ø© Ù…Ø³Ø§Ø¹Ø¯Ø©.
     * Ø§Ù„Ù…Ù„Ù Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ Ø¹Ù† Ø§Ù„Ø£Ø¯Ø¹ÙŠØ© Ù‡Ùˆ Ø§Ù„Ø°ÙŠ ÙŠØ­Ø¯Ø¯
     * Ø±Ù‚Ù… Ø§Ù„Ø¯Ø¹Ø§Ø¡ Ø§Ù„ØªØ§Ù„ÙŠ.
     */
    function nextDua(categoryId, index) {

        const nextIndex =
            Number(index) + 1;

        if (
            !Number.isInteger(nextIndex) ||
            nextIndex < 0
        ) {
            return null;
        }

        return goToDua(
            categoryId,
            nextIndex
        );
    }

    /*
     * =====================================================
     * Ø§Ù„Ù‚Ø±Ø¢Ù†
     * =====================================================
     *
     * Ù†ØªØ±ÙƒÙ‡ Ø¬Ø§Ù‡Ø²Ù‹Ø§ Ù…Ù† Ø§Ù„Ø¢Ù†.
     *
     * Ù…Ø«Ø§Ù„:
     * quran â†’ surah â†’ ayah
     */

    function goToQuranSurah(surahNumber) {

        const number =
            Number(surahNumber);

        if (
            !Number.isInteger(number) ||
            number < 1
        ) {
            return null;
        }

        return push(
            "quran-reader",
            {
                section: "quran",
                surah: number
            },
            "#quran-surah-" + number
        );
    }

    function goToQuranAyah(
        surahNumber,
        ayahNumber
    ) {

        const surah =
            Number(surahNumber);

        const ayah =
            Number(ayahNumber);

        if (
            !Number.isInteger(surah) ||
            !Number.isInteger(ayah) ||
            surah < 1 ||
            ayah < 1
        ) {
            return null;
        }

        return push(
            "quran-ayah",
            {
                section: "quran",
                surah: surah,
                ayah: ayah
            },
            "#quran-" +
            surah +
            "-" +
            ayah
        );
    }

    /*
     * =====================================================
     * Ø§Ù„Ø¹Ù…Ø±Ø©
     * =====================================================
     */

    function goToUmrahStep(step) {

        if (!step) {
            return null;
        }

        return push(
            "umrah-step",
            {
                section: "umrah",
                step: step
            },
            "#umrah-" +
            encodeURIComponent(step)
        );
    }

    /*
     * =====================================================
     * Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„Ù€ Route Ø§Ù„Ø­Ø§Ù„ÙŠ
     * =====================================================
     */

    function getCurrentState() {

        return normalizeState(
            history.state
        );
    }

    function getCurrentRoute() {

        const state =
            getCurrentState();

        if (!state) {
            return "home";
        }

        return state.masaaRoute;
    }

    /*
     * =====================================================
     * Ù…Ø¹Ø±ÙØ© Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø­Ø§Ù„ÙŠØ© Ù…Ù† Ø§Ù„Ù€ URL
     * Ø¹Ù†Ø¯ ÙØªØ­ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø£Ùˆ Ø¹Ù…Ù„ Refresh
     * =====================================================
     */

    function detectRouteFromHash() {

        const hash =
            window.location.hash
                .replace(/^#/, "")
                .trim();

        /*
         * Home
         */
        if (!hash) {
            return createState("home");
        }

        /*
         * Ø§Ù„Ø£Ù‚Ø³Ø§Ù… Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©
         */
        if (hash === "duas") {
            return createState(
                "duas",
                {
                    section: "duas"
                }
            );
        }

        if (hash === "quran") {
            return createState(
                "quran",
                {
                    section: "quran"
                }
            );
        }

        if (hash === "umrah") {
            return createState(
                "umrah",
                {
                    section: "umrah"
                }
            );
        }

        if (hash === "hadith") {
            return createState(
                "hadith",
                {
                    section: "hadith"
                }
            );
        }

        if (hash === "nasheeds") {
            return createState(
                "nasheeds",
                {
                    section: "nasheeds"
                }
            );
        }

        if (hash === "journey") {
            return createState(
                "journey",
                {
                    section: "journey"
                }
            );
        }

        if (hash === "memories") {
            return createState(
                "memories",
                {
                    section: "memories"
                }
            );
        }

        if (hash === "rating") {
            return createState(
                "rating",
                {
                    section: "rating"
                }
            );
        }

        if (hash === "settings") {
            return createState(
                "settings",
                {
                    section: "settings"
                }
            );
        }

        /*
         * ØªØµÙ†ÙŠÙ Ø£Ø¯Ø¹ÙŠØ©
         *
         * #duas-category-travel
         */
        if (
            hash.indexOf(
                "duas-category-"
            ) === 0
        ) {

            const category =
                decodeURIComponent(
                    hash.substring(
                        "duas-category-".length
                    )
                );

            return createState(
                "duas-category",
                {
                    section: "duas",
                    category: category
                }
            );
        }

        /*
         * Ø¯Ø¹Ø§Ø¡ Ù…Ø­Ø¯Ø¯
         *
         * #dua-travel-0
         */
        if (
            hash.indexOf(
                "dua-"
            ) === 0
        ) {

            const value =
                hash.substring(
                    "dua-".length
                );

            const separator =
                value.lastIndexOf("-");

            if (separator > 0) {

                const category =
                    decodeURIComponent(
                        value.substring(
                            0,
                            separator
                        )
                    );

                const index =
                    Number(
                        value.substring(
                            separator + 1
                        )
                    );

                if (
                    Number.isInteger(index) &&
                    index >= 0
                ) {

                    return createState(
                        "duas-reader",
                        {
                            section: "duas",
                            category: category,
                            index: index
                        }
                    );
                }
            }
        }

        /*
         * Ø³ÙˆØ±Ø© Ù‚Ø±Ø¢Ù†
         *
         * #quran-surah-2
         */
        if (
            hash.indexOf(
                "quran-surah-"
            ) === 0
        ) {

            const surah =
                Number(
                    hash.substring(
                        "quran-surah-".length
                    )
                );

            if (
                Number.isInteger(surah) &&
                surah > 0
            ) {

                return createState(
                    "quran-reader",
                    {
                        section: "quran",
                        surah: surah
                    }
                );
            }
        }

        /*
         * Ø¢ÙŠØ© Ù‚Ø±Ø¢Ù†
         *
         * #quran-2-255
         */
        if (
            hash.indexOf(
                "quran-"
            ) === 0
        ) {

            const value =
                hash.substring(
                    "quran-".length
                );

            const parts =
                value.split("-");

            if (parts.length === 2) {

                const surah =
                    Number(parts[0]);

                const ayah =
                    Number(parts[1]);

                if (
                    Number.isInteger(surah) &&
                    Number.isInteger(ayah) &&
                    surah > 0 &&
                    ayah > 0
                ) {

                    return createState(
                        "quran-ayah",
                        {
                            section: "quran",
                            surah: surah,
                            ayah: ayah
                        }
                    );
                }
            }
        }

        /*
         * Ø£ÙŠ Route ØºÙŠØ± Ù…Ø¹Ø±ÙˆÙ
         * ÙŠØ±Ø¬Ø¹ Home Ø¨Ø´ÙƒÙ„ Ø¢Ù…Ù†.
         */
        return createState("home");
    }

    /*
     * =====================================================
     * ØªÙ‡ÙŠØ¦Ø© Ø§Ù„ØªØ·Ø¨ÙŠÙ‚
     * =====================================================
     *
     * Ù‡Ø°Ù‡ Ø£Ù‡Ù… Ù†Ù‚Ø·Ø© Ù„Ù„Ù€Refresh.
     *
     * Ø¥Ø°Ø§ ÙƒØ§Ù† Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø¹Ù„Ù‰ Route Ù…Ø­Ø¯Ø¯:
     *
     * #duas
     * #duas-category-travel
     * #dua-travel-3
     *
     * ÙÙ„Ù† Ù†Ø­ÙˆÙ„Ù‡ Ø¥Ù„Ù‰ Home.
     */
    function initialize() {

        const existingState =
            getCurrentState();

        /*
         * Ø¥Ø°Ø§ ÙƒØ§Ù† History ÙŠØ­ØªÙˆÙŠ Ø¨Ø§Ù„ÙØ¹Ù„
         * Ø¹Ù„Ù‰ Route ØµØ­ÙŠØ­ØŒ Ù†Ø­Ø§ÙØ¸ Ø¹Ù„ÙŠÙ‡.
         */
        if (existingState) {

            notify(
                existingState,
                "initialize"
            );

            return existingState;
        }

        /*
         * Ø¥Ø°Ø§ Ù„Ù… ÙŠÙˆØ¬Ø¯ State:
         * Ù†Ù‚Ø±Ø£ Ø§Ù„Ù€hash ÙˆÙ†Ø¨Ù†ÙŠ Ù…Ù†Ù‡ State.
         */
        const detectedState =
            detectRouteFromHash();

        /*
         * Ù†Ø¶Ø¹ Ø§Ù„Ù€State Ø¨Ø¯ÙˆÙ† Ø¥Ø¶Ø§ÙØ©
         * Entry Ø¬Ø¯ÙŠØ¯ ÙÙŠ History.
         */
        history.replaceState(
            detectedState,
            "",
            buildUrl(
                window.location.hash
            )
        );

        notify(
            detectedState,
            "initialize"
        );

        return detectedState;
    }

    /*
     * =====================================================
     * Ø²Ø± Back ÙÙŠ Ø§Ù„Ù‡Ø§ØªÙ / Ø§Ù„Ù…ØªØµÙØ­
     * =====================================================
     */

    window.addEventListener(
        "popstate",
        function (event) {

            if (isHandlingNavigation) {
                return;
            }

            isHandlingNavigation = true;

            try {

                const state =
                    normalizeState(
                        event.state
                    );

                /*
                 * Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ø§Ù„ØµÙØ­Ø© Home
                 * ÙˆÙ„Ø§ ÙŠÙˆØ¬Ø¯ State ÙˆØ§Ø¶Ø­ØŒ
                 * Ù†Ø¹ØªØ¨Ø±Ù‡Ø§ Home.
                 */
                const finalState =
                    state ||
                    createState("home");

                notify(
                    finalState,
                    "back"
                );

            } finally {

                isHandlingNavigation = false;

            }
        }
    );

    /*
     * =====================================================
     * API Ø§Ù„Ø¹Ø§Ù…Ø©
     * =====================================================
     */

    window.MasaaNavigation = {

        version: VERSION,

        /*
         * Ø§Ù„Ø£Ø³Ø§Ø³ÙŠ
         */
        initialize: initialize,

        push: push,
        replace: replace,

        back: back,
        home: home,

        /*
         * Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
         */
        goToSection: goToSection,

        goToDuas: goToDuas,
        goToQuran: goToQuran,
        goToUmrah: goToUmrah,
        goToHadith: goToHadith,
        goToNasheeds: goToNasheeds,
        goToJourney: goToJourney,
        goToMemories: goToMemories,
        goToRating: goToRating,
        goToSettings: goToSettings,

        /*
         * Ø§Ù„Ø£Ø¯Ø¹ÙŠØ©
         */
        goToDuaCategory: goToDuaCategory,
        goToDua: goToDua,
        nextDua: nextDua,

        /*
         * Ø§Ù„Ù‚Ø±Ø¢Ù†
         */
        goToQuranSurah: goToQuranSurah,
        goToQuranAyah: goToQuranAyah,

        /*
         * Ø§Ù„Ø¹Ù…Ø±Ø©
         */
        goToUmrahStep: goToUmrahStep,

        /*
         * Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Route Ø§Ù„Ø­Ø§Ù„ÙŠ
         */
        getCurrentState: getCurrentState,
        getCurrentRoute: getCurrentRoute,

        /*
         * Ø§Ù„Ø§Ø´ØªØ±Ø§Ùƒ ÙÙŠ Ø§Ù„ØªÙ†Ù‚Ù„
         */
        subscribe: function (listener) {

            if (
                typeof listener !==
                "function"
            ) {
                return function () {};
            }

            listeners.add(listener);

            return function () {
                listeners.delete(listener);
            };
        }
    };

})();document.addEventListener("DOMContentLoaded", function () {
    if (window.MasaaNavigation) {
        MasaaNavigation.initialize();
    }
});
