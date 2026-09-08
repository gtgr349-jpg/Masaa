const LocalNotifications =
    window.Capacitor?.Plugins?.LocalNotifications;

const AYOUTSHTI_TRIP_START =
    new Date(2026, 8, 5);

const AYOUTSHTI_TRIP_DAYS = 14;

const AYOUTSHTI_NOTIFICATION_IDS = [];

const AYOUTSHTI_MESSAGES = {

    morning: [
        "😂 صباح الخير يا حاجّة… نرجو الإفادة: تم الوصول للكعبة بنجاح؟ 🕋",
        "❤️ صباحك طمأنينة وراحة بال… ربنا يتقبل منك ويكتبلك يوم أجمل من اللي تتمنيه.",
        "😂 اصحي يا مَسْعَى… مكة مش هتستنى لحد ما تخلصي نوم 😂",
        "🕋 صباح من أطهر بقاع الأرض… يا رب يومك كله بركة ورضا.",
        "😂 تنبيه صباحي مهم: شربتي مياه ولا لسه مستنية جسمك يقدم استقالته؟ 😂",
        "❤️ ربنا يجعل أول حاجة تفرح قلبك النهارده دعوة مستجابة."
    ],

    afternoon: [
        "😂 مَسْعَى، افتكري إنك رايحة عمرة مش بطولة ماراثون… خديها واحدة واحدة 😂",
        "🥹 وإنتِ بتطوفي، سيبي كل حاجة على ربنا… يمكن دعوة واحدة تغيّر حاجات كتير.",
        "😂 لو تعبتي من المشي، افتكري إنك هترجعي تحكيلي قد إيه مشيتي… وأنا هقولك: تستاهلي 😂",
        "❤️ ربنا يرزقك في كل خطوة راحة، وفي كل دعوة إجابة، وفي كل لحظة سكينة.",
        "😂 مهمة اليوم: صورة حلوة لمكة… اللجنة المختصة بالذكريات مستنية 📸😂",
        "🕋 خلي قلبك حاضر قبل خطواتك… دي لحظات تستاهل تتعاش بكل قلبك.",
        "😂 لو حد سألك بتكلمي مين كتير… قولي: متابعة ميدانية ضرورية جدًا 😂",
        "❤️ ربنا يحفظك في كل طريق، ويكتبلك عمرتك كما تتمنين وأجمل."
    ],

    evening: [
        "😂 تنبيه عاجل: حد هنا وحش حد؟ ولا نسيتي الناس اللي بره؟ 😂",
        "😂 ممنوع الاختفاء أكتر من كده… الرحلة عمرة مش عملية اختطاف 😂",
        "😂 الإشعار ده ملوش هدف محدد… قولنا بس نرخم عليكي شوية 😂",
        "😂 مَسْعَى، افتحي التطبيق… مش عشان العمرة، عشان نشوف أخبار الحاجّة 😂",
        "😂 هو انتي رايحة عمرة ولا عاملة معسكر مشي؟ 😂",
        "😂 متنسيش تبعتي صور… عندنا لجنة تحقيق كاملة مستنية 📸😂",
        "😂 لو شفتي نفسك مبتسمة من غير سبب… غالبًا حد بيفكر فيكي 😌😂",
        "😂 شربتي مياه؟ أكلتي؟ ارتحتي؟ ولا قررتي تعيشي على البركة بس؟ 😂",
        "😂 مطلوب منك تقرير سريع: مكة حلوة زي ما سمعنا ولا نرجعلك تذكرة؟ 😂",
        "😂 لو تعبتي، ارتاحي… بس ممنوع ترجعي تقولي: أنا ما تعبتش خالص 😂"
    ],

    night: [
        "🌙 تصبحين على قلب مطمئن ودعوات مستجابة بإذن الله.",
        "❤️ قبل ما تنامي… احمدي ربنا إنك عيشتي يومًا كنتِ يومًا ما تتمني تعيشيه.",
        "🤲 اللهم اجعل ليلتها راحة، وقلبها سكينة، وغدها خيرًا مما تتمنى.",
        "😂 خلاص يا حاجّة… اليوم خلص، اقفلي التطبيق وروحي نامي بدل ما نفضل نرغي 😂",
        "🌙 نامي وإنتِ مطمنة… ربنا أكرم من كل أمنية في قلبك.",
        "❤️ ليلة هادئة على قلبك يا مَسْعَى، وربنا يكتبلك أجمل ختام للرحلة.",
        "❤️ يارب كل دعوة قالتها مَسْعَى في الحرم تكون سبب فرحة مكتوبة لها في حياتها.",
        "🤲 يا رب احفظها بعينك التي لا تنام، وكن معها في كل خطوة.",
        "❤️ يارب لما ترجع تكون شايلة في قلبها من السكينة أكتر بكتير من اللي كانت شايلة في شنطتها."
    ],

    special: [
        "🤲 يا رب تقبل عمرتها، واغفر ذنبها، واشرح صدرها، وارجعها إلينا وقلبها أسعد مما ذهب.",
        "🤲 اللهم ارزقها في رحلتها قلبًا مطمئنًا، ودعاءً مستجابًا، وذنبًا مغفورًا.",
        "🕋 اللهم لا تجعل لها في مكة دعوة إلا كتبت لها بها خيرًا.",
        "❤️ وحشتيني… بس خدي وقتك واستمتعي بكل لحظة هناك.",
        "❤️ المسافة كبيرة، بس دعواتي ليكي أقرب مما تتخيلي.",
        "🥹 خدي بالك من نفسك… في حد مستني يسمع منك كل تفاصيل الرحلة.",
        "❤️ كل صورة تبعتيها هتفضل ذكرى حلوة عندي بعد ما الرحلة تخلص.",
        "🥹 يمكن مش موجود معاكي هناك، بس قلبي فرحان عشانك في كل خطوة.",
        "❤️ ربنا يحفظك ويرجعك لينا سالمة وقلبك مليان نور وراحة.",
        "📸 صورة النهارده مش مجرد صورة… دي ذكرى هتفضلي ترجعي لها بعد سنين.",
        "❤️ خدي صورة للحظة اللي حسيتي فيها إنك فعلًا في مكة… اللحظة دي تستاهل تتخزن.",
        "😂 ممنوع الرجوع من غير ألبوم صور محترم… إحنا مش رايحين زيارة سوبر ماركت 😂📸",
        "🕋 كل لحظة هناك غالية… عيشيها الأول، وصوري منها اللي يخلي قلبك يبتسم بعدين.",
        "💗 مجرد تذكير صغير: ربنا يحبك وكتبلك تكوني هنا في الوقت ده.",
        "🥹 لو الإشعار ده جه في لحظة هدوء… خدي نفس عميق وقولي الحمد لله.",
        "❤️ يمكن الرسالة دي بسيطة، لكن وراها حد بيتمنى لك كل الخير في الدنيا.",
        "🕋 استمتعي باللحظة… مش كل يوم القلب بياخد فرصة يكون قريب من الكعبة."
    ]
};


function masaaNotificationId(day, slot) {
    return 9000 + (day * 10) + slot;
}


function masaaPickMessage(pool, index) {
    return pool[index % pool.length];
}


function masaaDate(dayOffset, hour) {

    const date = new Date(AYOUTSHTI_TRIP_START);

    date.setDate(
        date.getDate() + dayOffset
    );

    date.setHours(hour, 0, 0, 0);

    return date;
}


async function scheduleMasaaDailyNotifications() {

    if (!LocalNotifications) {

        console.log(
            "ℹ️ Daily scheduled notifications require the Android Capacitor app."
        );

        return false;
    }


    try {

        const permission =
            await LocalNotifications.requestPermissions();

        if (permission.display !== "granted") {

            alert(
                "⚠️ لازم تسمحي للتطبيق بإرسال الإشعارات من إعدادات الهاتف."
            );

            return false;
        }


        // إلغاء جدول مَسْعَى القديم
        const oldNotifications =
            [];

        for (
            let day = 0;
            day < AYOUTSHTI_TRIP_DAYS;
            day++
        ) {

            for (
                let slot = 1;
                slot <= 4;
                slot++
            ) {

                oldNotifications.push({
                    id: masaaNotificationId(day, slot)
                });
            }
        }


        try {

            await LocalNotifications.cancel({
                notifications: oldNotifications
            });

        } catch (cancelError) {

            console.warn(
                "⚠️ Could not cancel old notifications:",
                cancelError
            );
        }


        // إنشاء قناة الإشعارات
        try {

            await LocalNotifications.createChannel({
                id: "masaa-daily",
                name: "رسائل مَسْعَى اليومية",
                description: "رسائل ودعوات ومواقف لطيفة خلال رحلة العمرة",
                importance: 4,
                visibility: 1,
                sound: "default"
            });

        } catch (channelError) {

            console.warn(
                "⚠️ Notification channel setup:",
                channelError
            );
        }


        const notifications = [];


        for (
            let day = 0;
            day < AYOUTSHTI_TRIP_DAYS;
            day++
        ) {

            const morning =
                masaaPickMessage(
                    AYOUTSHTI_MESSAGES.morning,
                    day
                );

            const afternoon =
                masaaPickMessage(
                    AYOUTSHTI_MESSAGES.afternoon,
                    day
                );

            const evening =
                masaaPickMessage(
                    AYOUTSHTI_MESSAGES.evening,
                    day
                );

            const night =
                masaaPickMessage(
                    AYOUTSHTI_MESSAGES.night,
                    day
                );


            const messages = [
                {
                    slot: 1,
                    hour: 9,
                    title: "🌅 صباح الخير يا مَسْعَى",
                    body: morning
                },
                {
                    slot: 2,
                    hour: 13,
                    title: "🕋 مَسْعَى",
                    body: afternoon
                },
                {
                    slot: 3,
                    hour: 18,
                    title: "❤️ رسالة صغيرة",
                    body: evening
                },
                {
                    slot: 4,
                    hour: 22,
                    title: "🌙 قبل النوم",
                    body: night
                }
            ];


            messages.forEach(message => {

                const date =
                    masaaDate(
                        day,
                        message.hour
                    );


                // لا نضيف إشعارات انتهى وقتها
                if (date <= new Date()) {
                    return;
                }


                notifications.push({

                    id:
                        masaaNotificationId(
                            day,
                            message.slot
                        ),

                    title:
                        message.title,

                    body:
                        message.body,

                    channelId:
                        "masaa-daily",

                    schedule: {
                        at: date,
                        allowWhileIdle: true
                    },

                    extra: {
                        type: "masaa-daily",
                        tripDay: day + 1,
                        slot: message.slot
                    }

                });

            });
        }


        if (!notifications.length) {

            console.log(
                "ℹ️ No future notifications to schedule."
            );

            return false;
        }


        await LocalNotifications.schedule({
            notifications
        });


        localStorage.setItem(
            "masaaDailyNotificationsEnabled",
            "true"
        );


        localStorage.setItem(
            "masaaDailyNotificationsScheduledAt",
            new Date().toISOString()
        );


        console.log(
            `✅ تم جدولة ${notifications.length} إشعار لمَسْعَى`
        );


        return true;

    } catch (error) {

        console.error(
            "❌ Failed to schedule Masaa notifications:",
            error
        );

        alert(
            "⚠️ حصلت مشكلة أثناء تجهيز الإشعارات. حاولي مرة أخرى."
        );

        return false;
    }
}


window.enableMasaaNotifications = async function enableMasaaNotifications() {

    const homeButton =
        document.getElementById("notificationButton");

    const settingsButton =
        document.getElementById("settingsNotificationButton");

    const statusText =
        document.getElementById("notificationStatusText");


    function setNotificationUI(enabled) {

        if (enabled) {

            if (statusText) {
                statusText.textContent = "● مفعلة";
            }

            if (settingsButton) {
                settingsButton.classList.add(
                    "notification-enabled"
                );
            }

            if (homeButton) {
                homeButton.classList.add(
                    "notification-enabled"
                );
            }

        } else {

            if (statusText) {
                statusText.textContent = "○ غير مفعلة";
            }

            if (settingsButton) {
                settingsButton.classList.remove(
                    "notification-enabled"
                );
            }

            if (homeButton) {
                homeButton.classList.remove(
                    "notification-enabled"
                );
            }
        }
    }


    try {

        /* =================================================
           Android / Capacitor
           ================================================= */

        if (LocalNotifications) {

            const permission =
                await LocalNotifications.requestPermissions();


            if (permission?.display !== "granted") {

                console.log(
                    "ℹ️ مَسْعَى: لم يتم السماح بإشعارات Android."
                );

                setNotificationUI(false);

                return false;
            }


            const scheduled =
                await scheduleMasaaDailyNotifications();


            if (scheduled) {

                localStorage.setItem(
                    "masaaDailyNotificationsEnabled",
                    "true"
                );

                setNotificationUI(true);

                console.log(
                    "🔔 مَسْعَى: إشعارات Android مفعلة."
                );

                return true;
            }


            setNotificationUI(false);

            return false;
        }


        /* =================================================
           Browser / PWA
           ================================================= */

        if (!("Notification" in window)) {

            console.log(
                "ℹ️ مَسْعَى: الإشعارات غير مدعومة."
            );

            setNotificationUI(false);

            return false;
        }


        let permission =
            Notification.permission;


        if (permission === "default") {

            permission =
                await Notification.requestPermission();

        }


        if (permission !== "granted") {

            console.log(
                "ℹ️ مَسْعَى: لم يتم السماح بإشعارات المتصفح."
            );

            setNotificationUI(false);

            return false;
        }


        localStorage.setItem(
            "masaaDailyNotificationsEnabled",
            "true"
        );


        if ("serviceWorker" in navigator) {

            try {

                await navigator.serviceWorker.ready;

                console.log(
                    "✅ Service Worker جاهز للإشعارات."
                );

            } catch (error) {

                console.warn(
                    "⚠️ Service Worker غير جاهز:",
                    error
                );
            }
        }


        setNotificationUI(true);


        console.log(
            "🔔 مَسْعَى: إشعارات المتصفح مفعلة."
        );


        return true;


    } catch (error) {

        console.error(
            "❌ مَسْعَى: Notification setup failed:",
            error
        );

        setNotificationUI(false);

        return false;
    }
}
/* =========================================================
   AUTO NOTIFICATIONS — مَسْعَى
   ========================================================= */

(function () {

    let masaaAutoNotificationStarted = false;

    async function startMasaaNotificationsAutomatically() {

        if (masaaAutoNotificationStarted) return;
        masaaAutoNotificationStarted = true;

        try {

            /* ننتظر تحميل التطبيق */
            await new Promise(resolve => {

                if (document.readyState === "loading") {
                    document.addEventListener(
                        "DOMContentLoaded",
                        resolve,
                        { once: true }
                    );
                } else {
                    resolve();
                }

            });

            /* ندي المتصفح/النظام فرصة يجهز Capacitor */
            await new Promise(resolve =>
                setTimeout(resolve, 1200)
            );


            /* لو المستخدم فعّل الإشعارات بالفعل، لا نطلبها مرة أخرى */
            const alreadyEnabled =
                localStorage.getItem(
                    "masaaDailyNotificationsEnabled"
                ) === "true";


            if (alreadyEnabled) {
                console.log(
                    "🔔 مَسْعَى: الإشعارات مفعلة بالفعل."
                );
                return;
            }


            /* تشغيل نفس نظام الإشعارات الموجود */
            if (
                typeof window.enableMasaaNotifications ===
                "function"
            ) {

                console.log(
                    "🔔 مَسْعَى: طلب تفعيل الإشعارات تلقائيًا..."
                );

                await window.enableMasaaNotifications();

            } else {

                console.warn(
                    "⚠️ مَسْعَى: وظيفة الإشعارات غير متاحة بعد."
                );

            }

        } catch (error) {

            console.error(
                "❌ مَسْعَى: Auto notification setup failed:",
                error
            );

        }

    }


    /* ننتظر أول فتح للتطبيق */
    startMasaaNotificationsAutomatically();


})();
/* =========================================================
   مَسْعَى — FINAL FONT + NOTIFICATION UX
   ========================================================= */

/* ---------- الخط ---------- */



