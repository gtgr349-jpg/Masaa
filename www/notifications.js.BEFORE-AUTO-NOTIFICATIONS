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
        "😂 اصحي يا أيوشتي… مكة مش هتستنى لحد ما تخلصي نوم 😂",
        "🕋 صباح من أطهر بقاع الأرض… يا رب يومك كله بركة ورضا.",
        "😂 تنبيه صباحي مهم: شربتي مياه ولا لسه مستنية جسمك يقدم استقالته؟ 😂",
        "❤️ ربنا يجعل أول حاجة تفرح قلبك النهارده دعوة مستجابة."
    ],

    afternoon: [
        "😂 أيوشتي، افتكري إنك رايحة عمرة مش بطولة ماراثون… خديها واحدة واحدة 😂",
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
        "😂 أيوشتي، افتحي التطبيق… مش عشان العمرة، عشان نشوف أخبار الحاجّة 😂",
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
        "❤️ ليلة هادئة على قلبك يا أيوشتي، وربنا يكتبلك أجمل ختام للرحلة.",
        "❤️ يارب كل دعوة قالتها أيوشتي في الحرم تكون سبب فرحة مكتوبة لها في حياتها.",
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


function ayoushtiNotificationId(day, slot) {
    return 9000 + (day * 10) + slot;
}


function ayoushtiPickMessage(pool, index) {
    return pool[index % pool.length];
}


function ayoushtiDate(dayOffset, hour) {

    const date = new Date(AYOUTSHTI_TRIP_START);

    date.setDate(
        date.getDate() + dayOffset
    );

    date.setHours(hour, 0, 0, 0);

    return date;
}


async function scheduleAyoushtiDailyNotifications() {

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


        // إلغاء جدول أيوشتي القديم
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
                    id: ayoushtiNotificationId(day, slot)
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
                id: "ayoushti-daily",
                name: "رسائل أيوشتي اليومية",
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
                ayoushtiPickMessage(
                    AYOUTSHTI_MESSAGES.morning,
                    day
                );

            const afternoon =
                ayoushtiPickMessage(
                    AYOUTSHTI_MESSAGES.afternoon,
                    day
                );

            const evening =
                ayoushtiPickMessage(
                    AYOUTSHTI_MESSAGES.evening,
                    day
                );

            const night =
                ayoushtiPickMessage(
                    AYOUTSHTI_MESSAGES.night,
                    day
                );


            const messages = [
                {
                    slot: 1,
                    hour: 9,
                    title: "🌅 صباح الخير يا أيوشتي",
                    body: morning
                },
                {
                    slot: 2,
                    hour: 13,
                    title: "🕋 أيوشتي",
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
                    ayoushtiDate(
                        day,
                        message.hour
                    );


                // لا نضيف إشعارات انتهى وقتها
                if (date <= new Date()) {
                    return;
                }


                notifications.push({

                    id:
                        ayoushtiNotificationId(
                            day,
                            message.slot
                        ),

                    title:
                        message.title,

                    body:
                        message.body,

                    channelId:
                        "ayoushti-daily",

                    schedule: {
                        at: date,
                        allowWhileIdle: true
                    },

                    extra: {
                        type: "ayoushti-daily",
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
            "ayoushtiDailyNotificationsEnabled",
            "true"
        );


        localStorage.setItem(
            "ayoushtiDailyNotificationsScheduledAt",
            new Date().toISOString()
        );


        console.log(
            `✅ تم جدولة ${notifications.length} إشعار لأيوشتي`
        );


        return true;

    } catch (error) {

        console.error(
            "❌ Failed to schedule Ayoushti notifications:",
            error
        );

        alert(
            "⚠️ حصلت مشكلة أثناء تجهيز الإشعارات. حاولي مرة أخرى."
        );

        return false;
    }
}


async function enableAyoushtiNotifications() {

    const button =
        document.getElementById(
            "notificationButton"
        );


    try {

        if (LocalNotifications) {

            const scheduled =
                await scheduleAyoushtiDailyNotifications();


            if (scheduled && button) {

                button.textContent =
                    "🔔 الإشعارات مفعلة";

            }

            return;
        }


        // ==========================================
        // 🌐 PWA / Browser
        // ==========================================

        if (!("Notification" in window)) {

            alert(
                "⚠️ الإشعارات غير مدعومة على هذا الجهاز."
            );

            return;
        }


        let permission =
            Notification.permission;


        if (permission === "default") {

            permission =
                await Notification.requestPermission();

        }


        if (permission !== "granted") {

            alert(
                "⚠️ لازم تسمحي للمتصفح بإرسال الإشعارات."
            );

            return;
        }


        if ("serviceWorker" in navigator) {

            try {

                await navigator.serviceWorker.ready;

                console.log(
                    "✅ Service Worker جاهز للإشعارات"
                );

            } catch (serviceWorkerError) {

                console.warn(
                    "⚠️ Service Worker notification setup failed:",
                    serviceWorkerError
                );
            }
        }


        if (button) {

            button.textContent =
                "🔔 الإشعارات مفعلة";

        }


        console.log(
            "ℹ️ Browser permission granted."
        );

    } catch (error) {

        console.error(
            "❌ Notification setup failed:",
            error
        );
    }
}
