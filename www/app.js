/* =========================================================
   🌙 MASAA — MAIN APP
   Premium UI + Existing Functionality
   ========================================================= */


/* =========================
   ✈️ TRIP SETTINGS
   ========================= */

const TRIP_START = new Date(2026, 8, 5);
const TRIP_DAYS = 14;


/* =========================
   📅 TRIP CALCULATIONS
   ========================= */

function getTripDay() {

    const today = new Date();

    const start = new Date(
        TRIP_START.getFullYear(),
        TRIP_START.getMonth(),
        TRIP_START.getDate()
    );

    const current = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const diff =
        current.getTime() - start.getTime();

    return Math.floor(
        diff / (1000 * 60 * 60 * 24)
    ) + 1;
}


function getTripStatus() {

    const today = new Date();

    const start = new Date(
        TRIP_START.getFullYear(),
        TRIP_START.getMonth(),
        TRIP_START.getDate()
    );

    const end = new Date(start);

    end.setDate(
        start.getDate() + TRIP_DAYS - 1
    );


    if (today < start) {

        const remaining =
            Math.ceil(
                (start - today) /
                (1000 * 60 * 60 * 24)
            );

        return {
            status: "before",
            remainingDays: remaining
        };
    }


    if (today > end) {

        return {
            status: "after"
        };
    }


    return {
        status: "during",
        day: getTripDay()
    };
}


/* =========================
   ✨ TRIP PROGRESS UI
   ========================= */

function ensureTripProgressUI() {

    const tripCard =
        document.querySelector(".trip-card");

    if (!tripCard) return null;


    let progress =
        tripCard.querySelector(".trip-progress-wrap");


    if (!progress) {

        progress =
            document.createElement("div");

        progress.className =
            "trip-progress-wrap";

        progress.innerHTML = `

            <div class="trip-progress-info">

                <span class="trip-progress-label">
                    استعداد الرحلة
                </span>

                <span
                    class="trip-progress-percent"
                    id="tripProgressPercent">
                    0%
                </span>

            </div>

            <div class="trip-progress-bar">

                <div
                    class="trip-progress-fill"
                    id="tripProgressFill">
                </div>

            </div>

        `;


        tripCard.appendChild(progress);
    }


    return progress;
}


/* =========================
   🕌 UPDATE TRIP UI
   ========================= */

function updateTripUI() {

    const status =
        getTripStatus();


    const icon =
        document.getElementById("tripIcon");

    const title =
        document.getElementById("tripTitle");

    const day =
        document.getElementById("tripDay");

    const message =
        document.getElementById("tripMessage");


    if (!icon || !title || !day || !message) {
        return;
    }


    ensureTripProgressUI();


    const fill =
        document.getElementById("tripProgressFill");

    const percent =
        document.getElementById(
            "tripProgressPercent"
        );

    const label =
        document.querySelector(
            ".trip-progress-label"
        );


    /* =========================
       BEFORE TRIP
       ========================= */

    if (status.status === "before") {

        icon.textContent = "✈️";

        title.textContent =
            "رحلتك قريبة يا مَسْعَى 🤍";

        day.textContent =
            status.remainingDays === 1
                ? "باقي يوم واحد فقط ✨"
                : `متبقي ${status.remainingDays} أيام ✨`;

        message.textContent =
            "جهزي قلبك قبل شنطتك… رحلة جميلة إلى بيت الله بإذن الله 🤲🏻";


        const totalPreparationDays = 14;

        const passed =
            Math.max(
                0,
                totalPreparationDays -
                status.remainingDays
            );

        const progressValue =
            Math.min(
                100,
                Math.round(
                    (passed / totalPreparationDays) * 100
                )
            );


        if (fill) {
            fill.style.width =
                `${progressValue}%`;
        }

        if (percent) {
            percent.textContent =
                `${progressValue}%`;
        }

        if (label) {
            label.textContent =
                "الاستعداد للرحلة";
        }

        return;
    }


    /* =========================
       DURING TRIP
       ========================= */

    if (status.status === "during") {

        const currentDay =
            Math.min(
                TRIP_DAYS,
                Math.max(
                    1,
                    status.day
                )
            );


        const progressValue =
            Math.round(
                (currentDay / TRIP_DAYS) * 100
            );


        icon.textContent = "🕋";

        title.textContent =
            "رحلتك إلى بيت الله 🤍";

        day.textContent =
            `اليوم ${currentDay} من ${TRIP_DAYS}`;

        message.textContent =
            "كل خطوة في رحلتك لها حكاية… عيشيها بهدوء وقرب من ربنا 🤲🏻";


        if (fill) {
            fill.style.width =
                `${progressValue}%`;
        }

        if (percent) {
            percent.textContent =
                `${progressValue}%`;
        }

        if (label) {
            label.textContent =
                "تقدم الرحلة";
        }

        return;
    }


    /* =========================
       AFTER TRIP
       ========================= */

    icon.textContent = "❤️";

    title.textContent =
        "رحلة مباركة يا مَسْعَى";

    day.textContent =
        "اكتملت رحلة الـ14 يوم ✨";

    message.textContent =
        "تقبل الله عمرتك وطاعتك، وجعلها بداية لأيام أجمل وأقرب إليه 🤍";


    if (fill) {
        fill.style.width = "100%";
    }

    if (percent) {
        percent.textContent = "100%";
    }

    if (label) {
        label.textContent =
            "اكتملت الرحلة";
    }
}


/* =========================
   🧭 OPEN SECTIONS
   ========================= */

function openSection(section) {

    closeSections();


    const target =
        document.getElementById(
            section + "Section"
        );


    if (!target) return;


    target.classList.remove("hidden");


    const elementsToHide = [
        ".header",
        ".trip-card",
        ".message-card",
        ".notification-button",
        ".menu"
    ];


    elementsToHide.forEach(selector => {

        const element =
            document.querySelector(selector);

        if (element) {
            element.classList.add("hidden");
        }

    });


    if (section === "umrah") {

        if (typeof renderUmrah === "function") {
            renderUmrah();
        }

    }


    if (section === "journey") {

        if (typeof renderJourney === "function") {
            renderJourney();
        }

    }

    if (
        section === "map" &&
        typeof initMap === "function"
    ) {
        initMap();
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   🏠 CLOSE SECTIONS
   ========================= */

function closeSections() {

    document
        .querySelectorAll(".page-section")
        .forEach(section => {

            section.classList.add("hidden");

        });


    const elementsToShow = [
        ".header",
        ".trip-card",
        ".message-card",
        ".notification-button",
        ".menu"
    ];


    elementsToShow.forEach(selector => {

        const element =
            document.querySelector(selector);

        if (element) {
            element.classList.remove("hidden");
        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   📅 JOURNEY
   ========================================================= */

function renderJourney() {

    const section = document.getElementById("journeySection");

    if (!section) {
        return;
    }


    const savedDay =
        parseInt(
            localStorage.getItem("masaaCurrentJourneyDay") || "1"
        );

    let currentDay =
        Math.min(
            Math.max(savedDay, 1),
            journeyDays.length
        );


    function renderCurrentDay() {

        const day = journeyDays[currentDay - 1];

        const progress =
            getJourneyDayProgress(day);


        let totalTasks = 0;
        let completedTasks = 0;

        journeyDays.forEach(item => {

            totalTasks += item.tasks.length;

            item.tasks.forEach((task, index) => {

                if (
                    isJourneyTaskCompleted(
                        item.day,
                        index
                    )
                ) {
                    completedTasks++;
                }

            });

        });


        const journeyProgress =
            totalTasks
                ? Math.round(
                    (completedTasks / totalTasks) * 100
                )
                : 0;


        section.innerHTML = `

            <button
                class="back-button" onclick="journeyBack()"> ← الرئيسية

            </button>


            <h2>
                📅 رحلة مَسْعَى
            </h2>

            <p class="section-subtitle">
                14 يومًا من الذكر والدعاء والطمأنينة 🤍
            </p>


            <div class="journey-overall-progress">

                <div>

                    <span>
                        تقدم الرحلة
                    </span>

                    <strong>
                        ${journeyProgress}%
                    </strong>

                </div>


                <div class="journey-overall-bar">

                    <div
                        style="width:${journeyProgress}%">
                    </div>

                </div>

            </div>


            <div class="journey-day-counter">

                <button
                    class="journey-nav-button"
                    ${currentDay === 1 ? "disabled" : ""}
                    onclick="changeJourneyDay(-1)">

                    ‹

                </button>


                <div>

                    <span>
                        اليوم
                    </span>

                    <strong>
                        ${currentDay}
                    </strong>

                    <span>
                        من ${journeyDays.length}
                    </span>

                </div>


                <button
                    class="journey-nav-button"
                    ${currentDay === journeyDays.length ? "disabled" : ""}
                    onclick="changeJourneyDay(1)">

                    ›

                </button>

            </div>


            <div class="journey-days">

                <div class="journey-day-card" onclick="if (!event.target.closest('button,input,select,textarea,label')) changeJourneyDay(1)">

                    <div class="journey-day-header">

                        <div class="journey-day-icon">
                            ${day.icon}
                        </div>

                        <div class="journey-day-info">

                            <span class="journey-day-number">
                                اليوم ${day.day} من 14
                            </span>

                            <h3>
                                ${day.title}
                            </h3>

                            <span class="journey-date">
                                ${day.date}
                            </span>

                        </div>

                    </div>


                    <p class="journey-description">
                        ${day.description}
                    </p>


                    <div class="journey-progress">

                        <div class="journey-progress-top">

                            <span>
                                إنجاز اليوم
                            </span>

                            <strong>
                                ${progress}%
                            </strong>

                        </div>


                        <div class="journey-progress-bar">

                            <div
                                class="journey-progress-fill"
                                style="width:${progress}%">
                            </div>

                        </div>

                    </div>


                    <div class="journey-tasks">

                        ${day.tasks.map((task, index) => {

                            const completed =
                                isJourneyTaskCompleted(
                                    day.day,
                                    index
                                );

                            return `

                                <button
                                    class="journey-task ${completed ? "completed" : ""}"
                                    onclick="toggleJourneyTask(${day.day}, ${index})">

                                    <span class="task-check">
                                        ${completed ? "✓" : ""}
                                    </span>

                                    <span class="task-text">
                                        ${task}
                                    </span>

                                </button>

                            `;

                        }).join("")}

                    </div>


                    <div class="journey-rating">

                        <div class="journey-rating-title">
                            ⭐ كيف كان يومك؟
                        </div>

                        <div class="journey-rating-options">

                            ${[
                                ["tired", "😔", "متعب"],
                                ["normal", "😐", "عادي"],
                                ["good", "🙂", "جيد"],
                                ["great", "😊", "رائع"],
                                ["beautiful", "🤍", "يوم جميل"]
                            ].map(item => {

                                const selected =
                                    getJourneyRating(day.day) === item[0];

                                return `

                                    <button
                                        class="journey-rating-button ${selected ? "active" : ""}"
                                        onclick="setJourneyRating(${day.day}, '${item[0]}')">

                                        <span>
                                            ${item[1]}
                                        </span>

                                        <small>
                                            ${item[2]}
                                        </small>

                                    </button>

                                `;

                            }).join("")}

                        </div>

                    </div>


                </div>

            </div>


            <div class="journey-overall-rating">

    <div class="journey-overall-title">
        ⭐ تقييم رحلتك حتى الآن
    </div>

    <div class="journey-overall-content">

        <div class="journey-overall-score">
            ${getOverallJourneyRating().average || "—"}
        </div>

        <div class="journey-overall-info">
            <strong>
                ${getOverallJourneyRating().label}
            </strong>

            <span>
                تم تقييم ${getOverallJourneyRating().count} من 14 يوم
            </span>
        </div>

    </div>

</div>
<div class="journey-navigation">

                <button
                    class="journey-main-button"
                    ${currentDay === 1 ? "disabled" : ""}
                    onclick="changeJourneyDay(-1)">

                    ← اليوم السابق

                </button>


                <button
                    class="journey-main-button"
                    ${currentDay === journeyDays.length ? "disabled" : ""}
                    onclick="changeJourneyDay(1)">

                    اليوم التالي →

                </button>

            </div>

        `;
    }


    window.changeJourneyDay = function(direction) {

    const newDay =
        currentDay + direction;

    if (
        newDay < 1 ||
        newDay > journeyDays.length
    ) {
        return;
    }

    currentDay = newDay;

    localStorage.setItem(
        "masaaCurrentJourneyDay",
        currentDay
    );

    history.pushState(
        {
            masaaRoute: "journey",
            day: currentDay
        },
        "",
        window.location.pathname +
        window.location.search +
        "#journey-" +
        currentDay
    );

    renderCurrentDay();

};


    renderCurrentDay();

}
function masaaTapToNext(type) {

    if (type === "umrah") {
        window.startTawaf();
        return;
    }

    if (type === "tawaf") {
        window.nextTawafRound();
        return;
    }

    if (type === "sai") {
        window.nextSaiRound();
        return;
    }
}
function renderUmrah() {

    const section =
        document.getElementById(
            "umrahSection"
        );

    if (!section) return;


    section.innerHTML = `

        <button
            class="back-button" onclick="journeyBack()"> ← الرئيسية

        </button>


        <h2>
            🕋 عمرتي
        </h2>

        <p class="section-subtitle">
            دليلك خطوة بخطوة لأداء العمرة
        </p>


        <div class="umrah-header">

            <div class="journey-header">

                <div class="journey-icon umrah-icon">
                    🕋
                </div>

                <div>

                    <strong>
                        رحلة العمرة
                    </strong>

                    <div>
                        بهدوء… خطوة بخطوة 🤍
                    </div>

                </div>

            </div>


            <div class="umrah-progress">

                <div class="progress-item">
                    الإحرام
                </div>

                <div class="progress-line"></div>

                <div class="progress-item">
                    الطواف
                </div>

                <div class="progress-line"></div>

                <div class="progress-item">
                    السعي
                </div>

                <div class="progress-line"></div>

                <div class="progress-item">
                    التحلل
                </div>

            </div>

        </div>


        <div class="umrah-step-card" onclick="masaaTapToNext('umrah')">

            <h3>
                🌙 أولًا: الإحرام
            </h3>

            <div class="info-box">

                انوي العمرة من الميقات،
                وابدئي بالتلبية بعد الإحرام.

            </div>


            <div class="talbiyah">

                <strong>
                    التلبية:
                </strong>

                <br><br>

                لبيك اللهم لبيك،
                لبيك لا شريك لك لبيك،
                إن الحمد والنعمة لك والملك،
                لا شريك لك.

            </div>


            <div class="dua">

                🤲
                أكثري من الدعاء والاستغفار
                والصلاة على النبي ﷺ.

            </div>


            <div class="important">

                ⚠️
                إذا كان لديكِ شك في حكم من أحكام
                الإحرام، اسألي أهل العلم ولا تعتمدي
                على الاجتهاد الشخصي.

            </div>


            <button
                class="primary-button"
                onclick="startTawaf()">

                بدأت الطواف 🕋

            </button>

        </div>

    `;
}


/* =========================================================
   🕋 TAWAF
   ========================================================= */

function startTawaf() {

    window.tawafRound = 1;

    renderTawaf();
}


function renderTawaf() {

    const section =
        document.getElementById(
            "umrahSection"
        );

    if (!section) return;


    const round =
        window.tawafRound || 1;


    section.innerHTML = `

        <button
            class="back-button" onclick="journeyBack()"> ← الرئيسية

        </button>


        <h2>
            🕋 الطواف
        </h2>

        <p class="section-subtitle">
            سبعة أشواط حول الكعبة
        </p>


        <div class="tawaf-counter" onclick="masaaTapToNext('tawaf')">

            <div class="counter-title">
                الشوط الحالي
            </div>


            <div class="counter-number">
                ${round}
            </div>


            <div class="counter-total">
                من 7 أشواط
            </div>


            <div
                id="tawafDots"
                class="tawaf-dots">

                ${Array.from(
                    { length: 7 },
                    (_, i) => `
                        <span
                            class="${
                                i < round
                                    ? "active"
                                    : ""
                            }">
                        </span>
                    `
                ).join("")}

            </div>

        </div>


        <div class="info-box">

            🕋 اجعلي الكعبة عن يسارك،
            وابدئي الشوط من الحجر الأسود.

        </div>


        <div class="dua">

            🤲

            ليس هناك دعاء محدد لكل شوط،
            فادعي بما تحبين من خير الدنيا والآخرة.

        </div>


        <div class="note">

            ✨ لا تنشغلي بالهاتف أثناء الطواف،
            واجعلي قلبك حاضرًا مع الله.

        </div>


        <button
            class="primary-button"
            onclick="nextTawafRound()">

            ${
                round < 7
                    ? "أنهيت هذا الشوط ✓"
                    : "أنهيت الأشواط السبعة ✓"
            }

        </button>

    `;
}


function updateTawaf() {

    renderTawaf();
}


function nextTawafRound() {

    if (!window.tawafRound) {
        window.tawafRound = 1;
    }


    if (window.tawafRound < 7) {

        window.tawafRound++;

        renderTawaf();

    } else {

        finishTawaf();

    }
}


function finishTawaf() {

    const section =
        document.getElementById(
            "umrahSection"
        );

    if (!section) return;


    section.innerHTML = `

        <button
            class="back-button" onclick="journeyBack()"> ← الرئيسية

        </button>


        <div class="completion-card">

            <div class="completion-icon">
                🕋
            </div>

            <h2>
                تم الطواف 🤍
            </h2>

            <p class="special-message">

                تقبل الله منكِ،
                وجعل كل خطوة في ميزان حسناتكِ.

            </p>


            <div class="dua">

                اللهم تقبل عمرتي،
                واغفر لي وارحمني،
                واكتب لي الخير حيث كان.

            </div>


            <button
                class="primary-button"
                onclick="startSai()">

                نبدأ السعي 🤍

            </button>

        </div>

    `;
}


/* =========================================================
   🏃‍♀️ SAI
   ========================================================= */

function startSai() {

    window.saiRound = 1;

    renderSai();
}


function renderSai() {

    const section =
        document.getElementById(
            "umrahSection"
        );

    if (!section) return;


    const round =
        window.saiRound || 1;


    const fromSafa =
        round % 2 === 1;


    const currentPlace =
        fromSafa
            ? "الصفا"
            : "المروة";


    section.innerHTML = `

        <button
            class="back-button" onclick="journeyBack()"> ← الرئيسية

        </button>


        <h2>
            🏃‍♀️ السعي
        </h2>

        <p class="section-subtitle">
            سبعة أشواط بين الصفا والمروة
        </p>


        <div class="tawaf-counter" onclick="masaaTapToNext('sai')">

            <div class="counter-title">
                الشوط الحالي
            </div>


            <div class="counter-number">
                ${round}
            </div>


            <div class="counter-total">
                من 7 أشواط
            </div>

        </div>


        <div class="sai-route">

            <div class="sai-point">
                الصفا
            </div>

            <div class="sai-arrow">
                ←
            </div>

            <div class="sai-point">
                المروة
            </div>

        </div>


        <div class="info-box">

            أنتِ الآن عند
            <strong>
                ${currentPlace}
            </strong>

            <br>

            ابدئي الشوط من المكان الصحيح
            واحتسبي الأجر عند الله.

        </div>


        <div class="dua">

            🤲

            ادعي بما تحبين،
            وأكثرِي من الذكر والاستغفار.

        </div>


        <button
            class="primary-button"
            onclick="nextSaiRound()">

            ${
                round < 7
                    ? "أنهيت هذا الشوط ✓"
                    : "أنهيت السعي ✓"
            }

        </button>

    `;
}


function nextSaiRound() {

    if (!window.saiRound) {
        window.saiRound = 1;
    }


    if (window.saiRound < 7) {

        window.saiRound++;

        renderSai();

    } else {

        finishSai();

    }
}


function finishSai() {

    const section =
        document.getElementById(
            "umrahSection"
        );

    if (!section) return;


    section.innerHTML = `

        <button
            class="back-button" onclick="journeyBack()"> ← الرئيسية

        </button>


        <div class="completion-card">

            <div class="completion-icon">
                🤍
            </div>

            <h2>
                تم السعي
            </h2>

            <p class="special-message">

                بقي التحلل بقص أو تقصير الشعر،
                وبذلك تتم العمرة بإذن الله.

            </p>


            <div class="important">

                ✨ للمرأة:
                تقصّر من أطراف شعرها قدر أنملة
                تقريبًا من جميع أطراف الشعر.

            </div>


            <button
                class="primary-button"
                onclick="finishUmrah()">

                أتممت العمرة 🤍

            </button>

        </div>

    `;
}


function finishUmrah() {

    localStorage.setItem(
        "masaaUmrahCompleted",
        "true"
    );


    const section =
        document.getElementById(
            "umrahSection"
        );

    if (!section) return;


    section.innerHTML = `

        <button
            class="back-button" onclick="journeyBack()"> ← الرئيسية

        </button>


        <div class="completion-card">

            <div class="completion-icon">
                🌙
            </div>


            <h2>
                عمرتك تمت بإذن الله 🤍
            </h2>


            <p class="special-message">

                تقبل الله منكِ،
                وغفر لكِ،
                وكتب لكِ الأجر والقبول.

            </p>


            <div class="dua">

                يا رب اجعلها عمرة مقبولة،
                وسعيًا مشكورًا،
                وذنبًا مغفورًا.

            </div>

        </div>

    `;
}



/* =========================================================
   🔔 NOTIFICATIONS
   ========================================================= */

function registerMasaaNotifications() {

    if (!("serviceWorker" in navigator)) {
        return;
    }


    navigator.serviceWorker
        .register("./service-worker.js")
        .then(() => {

            console.log(
                "✅ Masaa Service Worker registered"
            );

        })
        .catch(error => {

            console.warn(
                "⚠️ Service Worker registration failed:",
                error
            );

        });
}


/* =========================================================
   🚀 INIT
   ========================================================= */

function initMasaa() {

    updateTripUI();

    renderIslamMessage();

    registerMasaaNotifications();


    console.log(
        "🌙 Masaa initialized"
    );


    if (
        typeof Capacitor !== "undefined"
    ) {

        console.log(
            "📱 Capacitor detected"
        );

    }

}


/* =========================================================
   📱 DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initMasaa();

    }
);
/* =========================================================
   ⚙️ SETTINGS FUNCTIONS
   ========================================================= */

function setFontSize(size) {

    const root = document.documentElement;

    root.classList.remove(
        "font-small",
        "font-normal",
        "font-large"
    );


    if (size === "small") {

        root.classList.add("font-small");

    } else if (size === "large") {

        root.classList.add("font-large");

    } else {

        root.classList.add("font-normal");

    }


    localStorage.setItem(
        "masaaFontSize",
        size
    );


    document
        .querySelectorAll(".font-options button")
        .forEach(button => {

            button.classList.remove("active");

        });


    const activeButton =
        document.querySelector(
            `.font-options button[onclick="setFontSize('${size}')"]`
        );


    if (activeButton) {
        activeButton.classList.add("active");
    }
}


function loadFontSize() {

    const savedSize =
        localStorage.getItem(
            "masaaFontSize"
        ) || "normal";


    setFontSize(savedSize);
}


function resetMasaaData() {

    const confirmed =
        confirm(
            "هل أنتِ متأكدة من إعادة ضبط بيانات الرحلة؟\n\nسيتم حذف تقدم العمرة المحفوظ فقط."
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        "masaaUmrahCompleted"
    );


    localStorage.removeItem(
        "masaaJourneyProgress"
    );


    localStorage.removeItem(
        "hifzSession"
    );


    alert(
        "تمت إعادة ضبط بيانات الرحلة بنجاح 🤍"
    );


    closeSections();


    updateTripUI();
}


/* =========================================================
   ⚙️ LOAD SETTINGS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadFontSize();

    }
);

/* =========================================================
   🌙 MASAA THEME SETTINGS
   ========================================================= */

function setMasaaTheme(theme) {

    const root = document.documentElement;

    root.classList.remove(
        "theme-calm",
        "theme-night",
        "theme-light"
    );

    if (theme === "night") {

        root.classList.add("theme-night");

    } else if (theme === "light") {

        root.classList.add("theme-light");

    } else {

        root.classList.add("theme-calm");

    }

    localStorage.setItem(
        "masaaTheme",
        theme
    );

    document
        .querySelectorAll(".theme-options button")
        .forEach(button => {
            button.classList.remove("active");
        });

    const activeButton = document.querySelector(
        `.theme-options button[onclick="setMasaaTheme('${theme}')"]`
    );

    if (activeButton) {
        activeButton.classList.add("active");
    }
}


function loadMasaaTheme() {

    const savedTheme =
        localStorage.getItem("masaaTheme") || "calm";

    setMasaaTheme(savedTheme);
}


document.addEventListener(
    "DOMContentLoaded",
    () => {
        loadMasaaTheme();
    }
);

/* =========================================================
   📅 JOURNEY PROGRESS SYSTEM
   ========================================================= */

function getJourneyProgress() {

    return JSON.parse(
        localStorage.getItem("masaaJourneyProgress") || "{}"
    );

}


function saveJourneyProgress(progress) {

    localStorage.setItem(
        "masaaJourneyProgress",
        JSON.stringify(progress)
    );

}


function isJourneyTaskCompleted(day, taskIndex) {

    const progress = getJourneyProgress();

    return progress[day]?.tasks?.[taskIndex] === true;

}


function toggleJourneyTask(day, taskIndex) {

    const progress = getJourneyProgress();

    if (!progress[day]) {

        progress[day] = {
            tasks: []
        };

    }

    progress[day].tasks[taskIndex] =
        !isJourneyTaskCompleted(day, taskIndex);

    saveJourneyProgress(progress);

    renderJourney();

}


function getJourneyDayProgress(dayData) {

    const total = dayData.tasks.length;

    if (!total) {
        return 0;
    }

    let completed = 0;

    dayData.tasks.forEach((task, index) => {

        if (isJourneyTaskCompleted(dayData.day, index)) {
            completed++;
        }

    });

    return Math.round(
        (completed / total) * 100
    );

}


console.log("📅 نظام حفظ تقدم رحلة مَسْعَى جاهز");

/* =========================================================
   ⭐ DAILY JOURNEY RATING
   ========================================================= */

function getJourneyRatings() {

    return JSON.parse(
        localStorage.getItem("masaaJourneyRatings") || "{}"
    );

}


function saveJourneyRating(day, rating) {

    const ratings = getJourneyRatings();

    ratings[day] = rating;

    localStorage.setItem(
        "masaaJourneyRatings",
        JSON.stringify(ratings)
    );

}


function getJourneyRating(day) {

    const ratings = getJourneyRatings();

    return ratings[day] || null;

}


/* ================= OVERALL JOURNEY RATING ================= */
function getOverallJourneyRating() {
    const ratings = getJourneyRatings();
    const values = { tired:1, normal:2, good:3, great:4, beautiful:5 };
    let total = 0, count = 0;

    Object.keys(ratings).forEach(day => {
        const value = values[ratings[day]];
        if (value) {
            total += value;
            count++;
        }
    });

    if (!count) {
        return {
            average: 0,
            count: 0,
            label: "لسه الرحلة في بدايتها 🤍"
        };
    }

    const average = total / count;
    let label = "يوم جميل 🤍";

    if (average < 1.8) {
        label = "محتاجة راحة وهدوء 🤍";
    } else if (average < 2.8) {
        label = "أيام هادئة وجميلة 🌸";
    } else if (average < 3.8) {
        label = "رحلة جميلة جدًا 🤲🏻";
    } else if (average < 4.6) {
        label = "رحلة رائعة ما شاء الله ❤️";
    } else {
        label = "رحلة جميلة جدًا ومليانة بالخير 🤍";
    }

    return {
        average: Number(average.toFixed(1)),
        count: count,
        label: label
    };
}

function setJourneyRating(day, rating) {

    saveJourneyRating(day, rating);

    renderJourney();

    console.log(
        "⭐ تم حفظ تقييم اليوم:",
        day,
        rating
    );

}


console.log("⭐ نظام التقييم اليومي جاهز");

/* =========================================================
   🕋 MASAA FINAL PHONE BACK
   ========================================================= */

(function () {

    const masaaBaseUrl =
        window.location.pathname +
        window.location.search;

    /* الصفحة الحالية = الرئيسية فقط عند عدم وجود مسار */
    if (!window.location.hash) {
        history.replaceState(
            { masaaRoute: "home" },
            "",
            masaaBaseUrl
        );
    }

    /* استرجاع القسم الحالي بعد إعادة تحميل الصفحة */
    window.addEventListener("DOMContentLoaded", function () {

        const hash = window.location.hash.replace(/^#/, "");

        if (!hash) return;

        if (
            hash === "duas" ||
            hash.indexOf("duas-category-") === 0 ||
            hash.indexOf("dua-") === 0
        ) {
            return;
        }

        if (hash === "quran") {
            window.openSection("quran");
            return;
        }

        if (hash === "hadith") {
            window.openSection("hadith");
            return;
        }

        if (hash === "nasheeds") {
            window.openSection("nasheeds");
            return;
        }

        if (hash === "umrah") {
            window.openSection("umrah");
            return;
        }

        if (hash === "journey") {
            window.openSection("journey");
            return;
        }

    });
    /* فتح الصفحات الرئيسية */
    const masaaOriginalOpenSection = window.openSection;

    window.openSection = function (section) {

        /*
         * الأدعية أصبحت تحت إدارة MasaaNavigation.
         * نستخدم النظام المركزي فقط لهذا القسم في هذه المرحلة.
         */
        if (section === "duas" && window.MasaaNavigation) {

            MasaaNavigation.goToDuas();

            if (window.renderDuaHistory) {
                window.renderDuaHistory({
                    masaaNavigation: true,
                    masaaRoute: "duas"
                });
            }

            return;
        }

        /*
         * باقي الأقسام تظل على النظام القديم مؤقتًا
         * حتى ننقلها تدريجيًا إلى Navigation Manager.
         */
        history.pushState(
            {
                masaaRoute: section
            },
            "",
            masaaBaseUrl + "#" + section
        );

        masaaOriginalOpenSection(section);

        if (
            section === "quran" &&
            window.renderQuranHome
        ) {
            window.renderQuranHome();
        }

        if (
            section === "hadith" &&
            window.renderHadithHome
        ) {
            window.renderHadithHome();
        }

        if (
            section === "nasheeds" &&
            window.renderNasheedsHome
        ) {
            window.renderNasheedsHome();
        }
    };


    /* بدء الطواف */
    window.startTawaf = function () {

        window.tawafRound = 1;

        history.pushState(
            {
                masaaRoute: "tawaf",
                round: 1
            },
            "",
            masaaBaseUrl + "#tawaf-1"
        );

        renderTawaf();
    };


    /* الانتقال بين أشواط الطواف */
    window.nextTawafRound = function () {

        if (!window.tawafRound) {
            window.tawafRound = 1;
        }

        if (window.tawafRound < 7) {

            window.tawafRound++;

            history.pushState(
                {
                    masaaRoute: "tawaf",
                    round: window.tawafRound
                },
                "",
                masaaBaseUrl +
                "#tawaf-" +
                window.tawafRound
            );

            renderTawaf();

        } else {

            history.pushState(
                {
                    masaaRoute: "tawaf-finished"
                },
                "",
                masaaBaseUrl + "#tawaf-finished"
            );

            finishTawaf();
        }
    };


    /* بدء السعي */
    window.startSai = function () {

        window.saiRound = 1;

        history.pushState(
            {
                masaaRoute: "sai",
                round: 1
            },
            "",
            masaaBaseUrl + "#sai-1"
        );

        renderSai();
    };


    /* الانتقال بين أشواط السعي */
    window.nextSaiRound = function () {

        if (!window.saiRound) {
            window.saiRound = 1;
        }

        if (window.saiRound < 7) {

            window.saiRound++;

            history.pushState(
                {
                    masaaRoute: "sai",
                    round: window.saiRound
                },
                "",
                masaaBaseUrl +
                "#sai-" +
                window.saiRound
            );

            renderSai();

        } else {

            history.pushState(
                {
                    masaaRoute: "sai-finished"
                },
                "",
                masaaBaseUrl + "#sai-finished"
            );

            finishSai();
        }
    };


    /* زر الرجوع في الهاتف */
    window.addEventListener("popstate", function (event) {

        const state = event.state || {};

        /*
         * أي History تم إنشاؤه بواسطة Navigation Manager
         * يتم التعامل معه مركزيًا، ولا يتدخل فيه app.js.
         */
        if (
            state.masaaNavigation === true &&
            (
                state.masaaRoute === "duas" ||
                state.masaaRoute === "duas-category" ||
                state.masaaRoute === "duas-reader"
            )
        ) {
            return;
        }

        /* الرئيسية */
        if (state.masaaRoute === "home") {

            window.tawafRound = null;
            window.saiRound = null;

            closeSections();

            return;
        }


        /* عمرتي */
        if (state.masaaRoute === "umrah") {

            window.tawafRound = null;
            window.saiRound = null;

            closeSections();

            const section =
                document.getElementById("umrahSection");

            if (section) {
                section.classList.remove("hidden");
                renderUmrah();
            }

            document
                .querySelectorAll(
                    ".header, .trip-card, .message-card, .notification-button, .menu"
                )
                .forEach(element =>
                    element.classList.add("hidden")
                );

            return;
        }


        /* أيام الرحلة */
        if (state.masaaRoute === "journey") {

            window.tawafRound = null;
            window.saiRound = null;

            const requestedDay =
                Number(state.day) || 1;

            localStorage.setItem(
                "masaaCurrentJourneyDay",
                requestedDay
            );

            closeSections();

            const section =
                document.getElementById("journeySection");

            if (section) {
                section.classList.remove("hidden");
                renderJourney();
            }

            document
                .querySelectorAll(
                    ".header, .trip-card, .message-card, .notification-button, .menu"
                )
                .forEach(element =>
                    element.classList.add("hidden")
                );

            return;
        }


        /* أشواط الطواف */
        if (state.masaaRoute === "tawaf") {

            window.tawafRound =
                Number(state.round) || 1;

            window.saiRound = null;

            renderTawaf();

            return;
        }


        /* نهاية الطواف */
        if (state.masaaRoute === "tawaf-finished") {

            window.tawafRound = 7;
            window.saiRound = null;

            finishTawaf();

            return;
        }


        /* أشواط السعي */
        if (state.masaaRoute === "sai") {

            window.saiRound =
                Number(state.round) || 1;

            window.tawafRound = null;

            renderSai();

            return;
        }


        /* نهاية السعي */
        if (state.masaaRoute === "sai-finished") {

            window.saiRound = 7;

            finishSai();

            return;
        }


        /* القرآن الكريم */

        if (
            state.masaaRoute === "quran" ||
            state.masaaRoute === "quran-reader"
        ) {

            window.tawafRound = null;
            window.saiRound = null;

            closeSections();

            const quranSection =
                document.getElementById("quranSection");

            if (quranSection) {

                quranSection.classList.remove("hidden");

                document
                    .querySelectorAll(
                        ".header, .trip-card, .message-card, .notification-button, .menu"
                    )
                    .forEach(element =>
                        element.classList.add("hidden")
                    );

                if (
                    state.masaaRoute === "quran-reader" &&
                    window.openQuranSurah
                ) {

                    /*
                     * فتح السورة من حالة الـBack.
                     * quran.js يحتفظ بآخر موضع محليًا.
                     */
                    if (window.renderQuranReaderFromHistory) {
                        window.renderQuranReaderFromHistory(
                            Number(state.surah) || 1,
                            Number(state.ayah) || 1
                        );
                    }

                } else if (window.renderQuranHome) {

                    window.renderQuranHome();
                }
            }

            return;
        }

        /* الأدعية */

        if (
            state.masaaRoute === "duas" ||
            state.masaaRoute === "duas-category" ||
            state.masaaRoute === "duas-reader"
        ) {

            window.tawafRound = null;
            window.saiRound = null;

            closeSections();

            const duasSection =
                document.getElementById("duasSection");

            if (duasSection) {

                duasSection.classList.remove("hidden");

                document
                    .querySelectorAll(
                        ".header, .trip-card, .message-card, .notification-button, .menu"
                    )
                    .forEach(element =>
                        element.classList.add("hidden")
                    );

                if (window.renderDuaHistory) {
                    window.renderDuaHistory(state);
                }
            }

            return;
        }

        /* أي حالة غير معروفة = الرئيسية */
        closeSections();
    });

})();
window.journeyBack = function () {
    closeSections();
};









/* =========================================================
   مَسْعَى — ENTRY SCREEN
   ========================================================= */

function masaaEnterAsGuest() {
    sessionStorage.setItem("masaaGuestSession", "true");
    const entryScreen = document.getElementById("masaaEntryScreen");

    if (entryScreen) {
        entryScreen.classList.add("masaa-entry-hidden");
    }

    document.body.classList.add("masaa-app-entered");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function masaaLogin() {
    alert("تسجيل الدخول سيتم تفعيله في المرحلة القادمة 🤍");
}

function masaaCreateAccount() {
    alert("إنشاء الحساب سيتم تفعيله في المرحلة القادمة 🤍");
}

function initMasaaEntryScreen() {
    const entryScreen =
        document.getElementById("masaaEntryScreen");

    if (!entryScreen) {
        return;
    }

    const guestSession =
        sessionStorage.getItem("masaaGuestSession") === "true";

    if (guestSession) {
        entryScreen.classList.add("masaa-entry-hidden");
        document.body.classList.add("masaa-app-entered");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initMasaaEntryScreen();
});

















