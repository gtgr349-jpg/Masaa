/* =========================================================
   مَسْعَى — CENTRAL NAVIGATION MANAGER
   Version 1.0

   المسؤول عن:
   - التنقل بين أقسام التطبيق
   - History
   - زر Back في الهاتف
   - Refresh على نفس الصفحة
   - التنقل داخل الأقسام
   - Home من أي مكان
   - الانتقال المباشر إلى قسم محدد
   - Routes داخل الأدعية والقرآن والعمرة وغيرها

   ملاحظة:
   هذا الملف لا يقوم برسم الصفحات.
   الملفات الأخرى تخبره فقط بالمكان المطلوب،
   وهو يتولى إدارة الـ History.
   ========================================================= */

(function () {
    "use strict";

    const VERSION = "1.0";

    const baseUrl =
        window.location.pathname +
        window.location.search;

    /*
     * الأقسام الرئيسية في مَسْعَى
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
     * مستمعو التنقل
     *
     * الملفات الأخرى ستسجل نفسها هنا
     * لمعرفة أن المستخدم انتقل إلى Route جديد.
     */
    const listeners = new Set();

    /*
     * حماية من تكرار معالجة نفس الانتقال
     */
    let isHandlingNavigation = false;

    /*
     * إنشاء State موحد
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
     * التحقق من State
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
     * بناء الرابط
     */
    function buildUrl(hash) {
        return baseUrl + (hash || "");
    }

    /*
     * إعلام الملفات الأخرى بحدوث Navigation
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
                    "مَسْعَى Navigation listener error:",
                    error
                );

            }

        });
    }

    /*
     * إضافة Route جديد إلى History
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
     * استبدال Route الحالي
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
     * الرجوع خطوة واحدة
     *
     * مهم:
     * لا نستخدم history.go(-2)
     * ولا history.go(-(index + 3))
     */
    function back() {
        history.back();
    }

    /*
     * الصفحة الرئيسية
     *
     * عند الضغط على زر الرئيسية:
     * يتم جعل الصفحة الحالية هي Home.
     *
     * لا نقوم بعمل push لمسار Home جديد فوق
     * المسار الداخلي حتى لا تتكون سلسلة رجوع غريبة.
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
         * إرسال popstate يدويًا حتى تقوم
         * واجهة التطبيق بعرض Home فورًا.
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
     * الانتقال إلى قسم رئيسي
     */
    function goToSection(section) {

        const config =
            SECTIONS[section];

        if (!config) {

            console.warn(
                "مَسْعَى Navigation: قسم غير معروف:",
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
     * اختصارات الأقسام الرئيسية
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
     * الأدعية
     * =====================================================
     */

    /*
     * الانتقال إلى تصنيف أدعية
     *
     * مثال:
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
     * الانتقال إلى دعاء محدد
     *
     * مثال:
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
     * الانتقال للدعاء التالي
     *
     * هذه مجرد دالة مساعدة.
     * الملف المسؤول عن الأدعية هو الذي يحدد
     * رقم الدعاء التالي.
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
     * القرآن
     * =====================================================
     *
     * نتركه جاهزًا من الآن.
     *
     * مثال:
     * quran → surah → ayah
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
     * العمرة
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
     * قراءة الـ Route الحالي
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
     * معرفة الصفحة الحالية من الـ URL
     * عند فتح التطبيق أو عمل Refresh
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
         * الأقسام الرئيسية
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
         * تصنيف أدعية
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
         * دعاء محدد
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
         * سورة قرآن
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
         * آية قرآن
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
         * أي Route غير معروف
         * يرجع Home بشكل آمن.
         */
        return createState("home");
    }

    /*
     * =====================================================
     * تهيئة التطبيق
     * =====================================================
     *
     * هذه أهم نقطة للـRefresh.
     *
     * إذا كان المستخدم على Route محدد:
     *
     * #duas
     * #duas-category-travel
     * #dua-travel-3
     *
     * فلن نحوله إلى Home.
     */
    function initialize() {

        const existingState =
            getCurrentState();

        /*
         * إذا كان History يحتوي بالفعل
         * على Route صحيح، نحافظ عليه.
         */
        if (existingState) {

            notify(
                existingState,
                "initialize"
            );

            return existingState;
        }

        /*
         * إذا لم يوجد State:
         * نقرأ الـhash ونبني منه State.
         */
        const detectedState =
            detectRouteFromHash();

        /*
         * نضع الـState بدون إضافة
         * Entry جديد في History.
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
     * زر Back في الهاتف / المتصفح
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
                 * إذا كانت الصفحة Home
                 * ولا يوجد State واضح،
                 * نعتبرها Home.
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
     * API العامة
     * =====================================================
     */

    window.MasaaNavigation = {

        version: VERSION,

        /*
         * الأساسي
         */
        initialize: initialize,

        push: push,
        replace: replace,

        back: back,
        home: home,

        /*
         * الأقسام
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
         * الأدعية
         */
        goToDuaCategory: goToDuaCategory,
        goToDua: goToDua,
        nextDua: nextDua,

        /*
         * القرآن
         */
        goToQuranSurah: goToQuranSurah,
        goToQuranAyah: goToQuranAyah,

        /*
         * العمرة
         */
        goToUmrahStep: goToUmrahStep,

        /*
         * معلومات Route الحالي
         */
        getCurrentState: getCurrentState,
        getCurrentRoute: getCurrentRoute,

        /*
         * الاشتراك في التنقل
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

})();