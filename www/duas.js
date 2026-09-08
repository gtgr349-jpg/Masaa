(function () {
    "use strict";

    const categories = [
        { id: "umrah", icon: "🕋", title: "أدعية العمرة", desc: "أدعية ترافقك في مناسك العمرة" },
        { id: "travel", icon: "✈️", title: "أدعية السفر", desc: "من الخروج حتى الوصول" },
        { id: "mosque", icon: "🕌", title: "أدعية المسجد", desc: "أذكار وأدعية المسجد الحرام" },
        { id: "quran", icon: "📖", title: "أدعية القرآن", desc: "للتدبر والفهم والقرب من القرآن" },
        { id: "family", icon: "👨‍👩‍👧‍👦", title: "للأهل والأحباب", desc: "أجمل ما تدعين به لمن تحبين" },
        { id: "general", icon: "🤍", title: "أدعية وأذكار عامة", desc: "أذكار قصيرة ترافق يومك" },
        { id: "mine", icon: "❤️", title: "أدعيتي الخاصة", desc: "أدعية تحفظينها لنفسك" }
    ];

    const duaData = {

        umrah: [
            ["النية", "اللهم إني أريد العمرة فيسرها لي وتقبلها مني."],
            ["التلبية", "لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك."],
            ["عند رؤية الكعبة", "اللهم زد هذا البيت تشريفًا وتعظيمًا ومهابةً وأمنًا، وارزقني فيه من الخير كله."],
            ["أثناء الطواف", "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار."],
            ["بين الركن اليماني والحجر الأسود", "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار."],
            ["عند الصفا والمروة", "إن الصفا والمروة من شعائر الله."],
            ["دعاء القبول", "اللهم تقبل عمرتي، واغفر ذنبي، وارحم ضعفي، واكتب لي الخير والقبول."]
        ],

        travel: [
            ["دعاء السفر", "سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون."],
            ["دعاء الركوب", "اللهم إنا نسألك في سفرنا هذا البر والتقوى، ومن العمل ما ترضى."],
            ["الخروج من المنزل", "بسم الله، توكلت على الله، ولا حول ولا قوة إلا بالله."],
            ["الوصول", "اللهم أنزلني منزلًا مباركًا وأنت خير المنزلين."]
        ],

        mosque: [
            ["دخول المسجد", "اللهم افتح لي أبواب رحمتك."],
            ["الخروج من المسجد", "اللهم إني أسألك من فضلك."],
            ["في المسجد", "اللهم اجعلني من أهل المساجد، واغفر لي وارحمني وتقبل مني."]
        ],

        quran: [
            ["طلب العلم", "رب زدني علمًا."],
            ["الفهم والتدبر", "اللهم افتح علي فهم كتابك، وارزقني تدبره والعمل به."],
            ["مع القرآن", "اللهم اجعل القرآن ربيع قلبي ونور صدري وجلاء حزني وذهاب همي."]
        ],

        family: [
            ["للأهل", "رب اغفر لي ولوالدي وللمؤمنين يوم يقوم الحساب."],
            ["للأحباب", "اللهم احفظ أهلي وأحبابي، وبارك لهم في أعمارهم وأعمالهم، واكتب لهم الخير والسعادة."],
            ["دعاء جامع", "ربنا هب لنا من أزواجنا وذرياتنا قرة أعين واجعلنا للمتقين إمامًا."]
        ],

        general: [
            ["الاستغفار", "أستغفر الله وأتوب إليه."],
            ["الثبات", "يا مقلب القلوب ثبت قلبي على دينك."],
            ["العفو", "اللهم إنك عفو تحب العفو فاعف عني."],
            ["دعاء جامع", "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار."]
        ],
    };

    let currentCategory = null;
    let currentIndex = 0;function getSection() {
        return document.getElementById("duasSection");
    }

    function getContent() {
        return document.getElementById("duasContent");
    }

    function showDuasSection() {
        const section = getSection();

        if (!section) return;

        section.classList.remove("hidden");

        document
            .querySelectorAll(
                ".header, .trip-card, .message-card, .notification-button, .menu"
            )
            .forEach(el => el.classList.add("hidden"));
    }

    function renderCategories() {
        showDuasSection();

        const content = getContent();

        if (!content) return;

        content.innerHTML = `
            <div class="duas-categories-pro">
                ${categories.map(category => `
                    <button
                        type="button"
                        class="dua-category-card-pro"
                        onclick="window.openDuaCategory('${category.id}')">

                        <span class="dua-category-icon-pro">
                            ${category.icon}
                        </span>

                        <span class="dua-category-text-pro">
                            <strong>${category.title}</strong>
                            <small>${category.desc}</small>
                        </span>

                        <span class="dua-category-arrow">
                            ‹
                        </span>

                    </button>
                `).join("")}
            </div>
        `;
    }

    function renderCategory(categoryId) {
        showDuasSection();

        currentCategory = categoryId;

        const content = getContent();

        if (!content) return;

        const category = categories.find(
            item => item.id === categoryId
        );

        const list = duaData[categoryId] || [];

        if (!list.length) {
            content.innerHTML = `
                <button
                    class="dua-inner-back-pro"
                    type="button"
                    onclick="window.duasBackToCategories()">
                    ← الأدعية
                </button>

                <div class="dua-empty-pro">
                    لا توجد أدعية حاليًا.
                </div>
            `;

            return;
        }

        currentIndex = 0;

        renderSingleDua(category, list);
    }

    function renderSingleDua(category, list) {
        const content = getContent();

        if (!content || !list.length) return;

        const dua = list[currentIndex];

        const isFirst = currentIndex === 0;
        const isLast = currentIndex === list.length - 1;

        content.innerHTML = `
            <button
                class="dua-inner-back-pro"
                type="button"
                onclick="window.duasBackToCategories()">
                ← الأدعية
            </button>

            <div class="dua-reader-header-pro">
                <div>
                    <small>${category.title}</small>
                    <strong>${dua[0]}</strong>
                </div>

                <span>
                    ${currentIndex + 1}/${list.length}
                </span>
            </div>

            <article
                class="dua-reader-card-pro ${isLast ? "dua-last-card" : ""}"
                onclick="window.nextDua()">

                <div class="dua-reader-icon-pro">
                    ${category.icon}
                </div>

                <div class="dua-reader-label-pro">
                    ${dua[0]}
                </div>

                <p>${dua[1]}</p>

                ${
                    !isLast
                    ? `<div class="dua-swipe-hint">
                            اضغطي على الدعاء للانتقال للتالي
                       </div>`
                    : `<div class="dua-finished-hint">
                            🤍 انتهت أدعية هذا القسم
                       </div>`
                }

            </article>

            <div class="dua-reader-navigation-pro">

                <button
                    type="button"
                    class="dua-nav-button secondary"
                    onclick="event.stopPropagation(); window.previousDua()"
                    ${isFirst ? "disabled" : ""}>
                    → السابق
                </button>

                <button
                    type="button"
                    class="dua-nav-button primary"
                    onclick="event.stopPropagation(); window.nextDua()"
                    ${isLast ? "disabled" : ""}>
                    التالي ←
                </button>

            </div>
        `;
    }

    function getCurrentList() {

        return duaData[currentCategory] || [];
    }

    window.openDuaCategory = function (categoryId) {

        const list = duaData[categoryId] || [];

        if (!list.length) return;

        currentCategory = categoryId;
        currentIndex = 0;

        history.pushState(
            {
                masaaRoute: "duas-category",
                category: categoryId
            },
            "",
            location.pathname +
            location.search +
            "#duas-category-" +
            categoryId
        );

        history.pushState(
            {
                masaaRoute: "duas-reader",
                category: categoryId,
                index: 0
            },
            "",
            location.pathname +
            location.search +
            "#dua-" +
            categoryId +
            "-0"
        );

        const category = categories.find(
            item => item.id === categoryId
        );

        renderSingleDua(category, list);
    };

    window.nextDua = function () {

        const list = getCurrentList();

        if (!list.length) return;

        if (currentIndex >= list.length - 1) return;

        currentIndex++;

        history.pushState(
            {
                masaaRoute: "duas-reader",
                category: currentCategory,
                index: currentIndex
            },
            "",
            location.pathname +
            location.search +
            "#dua-" +
            currentCategory +
            "-" +
            currentIndex
        );

        const category = categories.find(
            item => item.id === currentCategory
        );

        renderSingleDua(category, list);
    };

    window.previousDua = function () {

        if (currentIndex <= 0) return;

        history.back();
    };

    window.duasBackToCategories = function () {

        const state = history.state || {};

        if (state.masaaRoute === "duas-reader") {

            const index =
                Number(state.index) || 0;

            history.go(-(index + 2));
            return;
        }

        if (state.masaaRoute === "duas-category") {
            history.back();
            return;
        }

        history.back();
    };

    window.duasBackToHome = function () {

        const state = history.state || {};

        if (state.masaaRoute === "duas-reader") {

            const index =
                Number(state.index) || 0;

            history.go(-(index + 3));
            return;
        }

        if (state.masaaRoute === "duas-category") {

            history.go(-2);
            return;
        }

        if (state.masaaRoute === "duas") {

            history.back();
            return;
        }

        history.back();
    };

    window.showDuasCategories = function () {

        const currentState = history.state || {};

        if (
            currentState.masaaRoute === "duas" ||
            currentState.masaaRoute === "duas-category" ||
            currentState.masaaRoute === "duas-reader"
        ) {

            history.replaceState(
                {
                    masaaRoute: "duas"
                },
                "",
                location.pathname +
                location.search +
                "#duas"
            );

            renderCategories();
            return;
        }

        history.pushState(
            {
                masaaRoute: "duas"
            },
            "",
            location.pathname +
            location.search +
            "#duas"
        );

        renderCategories();
    };

    window.renderDuaHistory = function (state) {

        if (!state) return;

        if (state.masaaRoute === "duas") {
            renderCategories();
            return;
        }

        if (state.masaaRoute === "duas-category") {
            renderCategory(state.category);
            return;
        }

        if (state.masaaRoute === "duas-reader") {

            currentCategory = state.category;
            currentIndex = Number(state.index) || 0;

            const category = categories.find(
                item => item.id === currentCategory
            );

            const list = getCurrentList();

            renderSingleDua(category, list);
        }
    };


    // ===== الإصلاح النهائي للتنقل في الأدعية =====

    window.openDuaCategory = function (categoryId) {

        const list = duaData[categoryId] || [];

        if (!list.length) return;

        currentCategory = categoryId;
        currentIndex = 0;

        history.pushState(
            {
                masaaRoute: "duas-category",
                category: categoryId
            },
            "",
            location.pathname +
            location.search +
            "#duas-category-" +
            categoryId
        );

        history.pushState(
            {
                masaaRoute: "duas-reader",
                category: categoryId,
                index: 0
            },
            "",
            location.pathname +
            location.search +
            "#dua-" +
            categoryId +
            "-0"
        );

        const category = categories.find(
            item => item.id === categoryId
        );

        renderSingleDua(category, list);
    };


    // عند الرجوع من الدعاء إلى التصنيفات
    window.duasBackToCategories = function () {

        const state = history.state || {};

        if (state.masaaRoute === "duas-reader") {

            const index = Number(state.index) || 0;

            history.go(-(index + 2));
            return;
        }

        if (state.masaaRoute === "duas-category") {

            history.back();
            return;
        }

        history.back();
    };


    // الرجوع للرئيسية
    window.duasBackToHome = function () {

        const state = history.state || {};

        if (state.masaaRoute === "duas-reader") {
            const index = Number(state.index) || 0;
            history.go(-(index + 3));
            return;
        }

        if (state.masaaRoute === "duas-category") {

            history.go(-2);
            return;
        }

        if (state.masaaRoute === "duas") {

            history.back();
            return;
        }

        history.back();
    };


    // عند الرجوع بالـ Back إلى التصنيف
    window.renderDuaHistory = function (state) {

        if (!state) return;

        if (state.masaaRoute === "duas") {
            renderCategories();
            return;
        }

        if (state.masaaRoute === "duas-category") {

            // التصنيف يعرض قائمة التصنيفات
            renderCategories();
            return;
        }

        if (state.masaaRoute === "duas-reader") {

            currentCategory = state.category;
            currentIndex = Number(state.index) || 0;

            const category = categories.find(
                item => item.id === currentCategory
            );

            const list = getCurrentList();

            renderSingleDua(category, list);
        }
    };
})();











