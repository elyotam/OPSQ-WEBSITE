export const locales = ["he", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "he";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const dir: Record<Locale, "rtl" | "ltr"> = { he: "rtl", en: "ltr" };

/**
 * Honesty rule for all copy below: a capability may carry status "live" only if it works
 * against real services today (Claude, Gmail, Google Calendar, memory, contacts, web chat,
 * approvals, audit, private tenants). WhatsApp and phone are "dev"; everything else is "later".
 * Style: short, concrete verbs, no hype. Hebrew stays gender-neutral.
 */
export type Status = "live" | "dev" | "later";

const he = {
  meta: {
    title: "OpsQ — עובד דיגיטלי לעסק",
    description:
      "עובד דיגיטלי שעושה את העבודה: מסכם מיילים, מכין תשובות, שולח אחרי אישור ומתאם פגישות. כל עסק בסביבה פרטית משלו.",
  },
  status: { live: "זמין עכשיו", dev: "בפיתוח", later: "בהמשך" },
  nav: {
    how: "איך זה עובד",
    today: "מה הוא עושה",
    control: "שליטה",
    future: "מה בדרך",
    faq: "שאלות",
    cta: "בקשת הדגמה",
    menu: "תפריט",
    otherLang: "EN",
    otherLangLabel: "English",
  },
  hero: {
    eyebrow: "פרטי לכל עסק",
    titleA: "עובד דיגיטלי שלא רק עונה.",
    titleB: "הוא עושה את העבודה.",
    sub: "נותנים לו משימה, והוא מבצע: קורא מיילים, מכין תשובות ומתאם פגישות. את ההחלטות החשובות הוא משאיר לך.",
    primary: "בקשת הדגמה",
    secondary: "איך זה עובד",
    trust: ["פעולות אמיתיות", "אישור לפני כל פעולה חשובה", "סביבה פרטית לכל עסק"],
    statusTitle: "המערכת מתרחבת כל הזמן",
    statusItems: [
      { name: "Gmail", status: "live" },
      { name: "Google Calendar", status: "live" },
      { name: "WhatsApp", status: "dev" },
      { name: "שיחות טלפון", status: "dev" },
      { name: "Browser Operator", status: "later" },
    ] as { name: string; status: Status }[],
  },
  demo: {
    window: "משימה חדשה",
    states: { running: "מבצע", waiting: "ממתין לאישור", done: "הושלם" },
    user: "תבדוק אם יותם שלח את החוזה. אם כן, תסכם לי מה הוא כתב ותקבע לנו פגישה למחר.",
    steps: [
      { tool: "gmail.search", icon: "search", run: "מחפש מייל מיותם", done: "נמצא: ״חוזה שירות״" },
      { tool: "gmail.read", icon: "mail", run: "קורא את המייל", done: "נקרא" },
      { tool: "claude", icon: "spark", run: "מסכם", done: "סוכם" },
      { tool: "calendar.list", icon: "calendar", run: "בודק את היומן למחר", done: "פנוי ב-15:00" },
    ],
    summaryLabel: "סיכום",
    summary: "יותם שלח את החוזה אתמול. הוא רוצה לסגור עד סוף השבוע, ושואל על מועד התשלום.",
    pending: "ממתין לאישור שלך",
    action: "פגישה עם יותם",
    detail: "מחר, 15:00–16:00",
    approve: "אישור",
    reject: "דחייה",
    approved: "אושר · בוצע פעם אחת",
    created: "נוצר ביומן",
    done: "הפגישה נקבעה ונרשמה ביומן הפעולות.",
    metrics: { tools: "כלים", approvals: "אישורים", time: "זמן" },
  },
  category: {
    eyebrow: "ההבדל",
    titleA: "לא עוד צ׳אטבוט.",
    titleB: "עובד דיגיטלי.",
    sub: "צ׳אטבוט מסביר איך. OpsQ עושה, ומבקש אישור לפני שמשהו יוצא.",
    bot: "צ׳אטבוט רגיל",
    opsq: "OpsQ",
    outcome: "התוצאה",
    examples: [
      {
        tab: "מענה ללקוח",
        ask: "תענה ללקוח ששאל על ההצעה",
        bot: "אני יכול לעזור לנסח מייל. הנה טיוטה להעתקה…",
        botOutcome: "טקסט להעתקה. את השאר עושים לבד.",
        opsq: [
          { text: "מצאתי את המייל של הלקוח.", tool: "gmail.search" },
          { text: "הכנתי תשובה לפי ההצעה.", tool: "gmail.draft" },
          { text: "אישרת, ושלחתי.", tool: "gmail.send" },
        ],
        opsqOutcome: "המייל נשלח ללקוח.",
      },
      {
        tab: "קביעת פגישה",
        ask: "תקבע פגישה עם יותם",
        bot: "כדי לקבוע פגישה, פותחים את היומן ובוחרים שעה פנויה…",
        botOutcome: "הסבר. הפגישה עדיין לא קבועה.",
        opsq: [
          { text: "מצאתי את יותם באנשי הקשר.", tool: "contacts.search" },
          { text: "בדקתי את היומן: מחר ב-10:00 פנוי.", tool: "calendar.list" },
          { text: "אישרת, וקבעתי.", tool: "calendar.create" },
        ],
        opsqOutcome: "הפגישה ביומן.",
      },
    ],
  },
  how: {
    eyebrow: "איך זה עובד",
    titleA: "אומרים מה צריך לקרות.",
    titleB: "OpsQ מטפל בדרך.",
    steps: [
      {
        title: "מחברים את העסק",
        body: "Gmail ויומן Google כבר היום. WhatsApp בהמשך.",
        quotes: [] as string[],
      },
      {
        title: "מדברים איתו כמו עם עובד",
        body: "",
        quotes: ["״תסכם לי את המיילים החשובים.״", "״תקבע פגישה עם יותם.״", "״תכין תשובה ללקוח.״"],
      },
      {
        title: "OpsQ מבצע",
        body: "בוחר את הכלים, מבקש אישור כשצריך ומעדכן כשסיים.",
        quotes: [] as string[],
      },
    ],
  },
  flow: {
    eyebrow: "מבקשה לתוצאה",
    titleA: "לא כלי.",
    titleB: "מערכת שמסיימת משימות.",
    request: "״תטפל בפגישה עם יותם״",
    steps: [
      { label: "מבין את המטרה", tool: "" },
      { label: "מחפש את יותם", tool: "contacts.search" },
      { label: "בודק ב-Gmail", tool: "gmail.search" },
      { label: "בודק ביומן", tool: "calendar.list" },
      { label: "מוצא זמן פנוי", tool: "" },
      { label: "מבקש אישור", tool: "approval", approval: true },
      { label: "קובע את הפגישה", tool: "calendar.create" },
      { label: "שולח עדכון ליותם", tool: "gmail.send" },
      { label: "בוצע", tool: "", done: true },
    ] as { label: string; tool: string; approval?: boolean; done?: boolean }[],
    note: "כל השלבים עובדים כבר היום. שליחת המייל וקביעת הפגישה מחכות לאישור.",
  },
  capabilities: {
    eyebrow: "זמין עכשיו",
    title: "מה הוא כבר עושה היום",
    sub: "בחשבונות האמיתיים של העסק.",
    items: [
      { icon: "search", title: "חיפוש וסיכום מיילים", body: "מוצא את מה שחשוב ומסכם בכמה שורות." },
      { icon: "pen", title: "טיוטות ותשובות", body: "מכין תשובה ללקוח או לספק." },
      { icon: "send", title: "שליחת מייל", body: "רק אחרי אישור שלך." },
      { icon: "calendar", title: "ניהול יומן", body: "בודק זמינות, וקובע ומבטל פגישות אחרי אישור." },
      { icon: "memory", title: "זיכרון עסקי", body: "זוכר העדפות והקשר. לא צריך להסביר פעמיים." },
      { icon: "contacts", title: "אנשי קשר", body: "שומר ומוצא פרטי קשר." },
      { icon: "chat", title: "שיחה ישירה", body: "כותבים לו משימה בשפה חופשית, בעברית או באנגלית." },
    ],
  },
  useCases: {
    eyebrow: "תפקידים",
    title: "עובד אחד. עשרות תפקידים.",
    sub: "✓ עובד כבר היום. השאר בדרך.",
    groups: [
      {
        title: "מכירות",
        items: [
          { text: "קביעת פגישות", status: "live" },
          { text: "follow-up ללידים", status: "later" },
          { text: "תזכורות", status: "later" },
        ],
      },
      {
        title: "שירות לקוחות",
        items: [
          { text: "סיכום פניות במייל", status: "live" },
          { text: "הכנת תשובות", status: "live" },
          { text: "תיאום המשך טיפול", status: "live" },
        ],
      },
      {
        title: "ניהול אישי",
        items: [
          { text: "מיילים", status: "live" },
          { text: "יומן", status: "live" },
          { text: "תיאומים", status: "live" },
          { text: "תזכורות", status: "later" },
        ],
      },
      {
        title: "ספקים",
        items: [
          { text: "בירורים במייל", status: "live" },
          { text: "תיאום", status: "live" },
          { text: "מעקב אוטומטי", status: "later" },
        ],
      },
      {
        title: "אדמיניסטרציה",
        items: [
          { text: "טפסים", status: "later" },
          { text: "מסמכים", status: "later" },
          { text: "משימות חוזרות", status: "later" },
        ],
      },
    ] as { title: string; items: { text: string; status: Status }[] }[],
  },
  autonomy: {
    eyebrow: "רמות אוטונומיה",
    title: "כמה חופש לתת לו? ההחלטה שלך.",
    sub: "קובעים לכל פעולה בנפרד. מתחילים בזהירות ומרחיבים עם הזמן.",
    levels: [
      { name: "עוזר", body: "מכין ומציע. שום דבר לא יוצא.", status: "live" },
      { name: "עובד עם אישור", body: "מכין הכול ומבצע אחרי אישור. זו ברירת המחדל.", status: "live" },
      { name: "עובד מהימן", body: "שגרה מתבצעת לבד. החלטות חשובות מגיעות אליך.", status: "live" },
      { name: "אוטונומי", body: "פועל לפי מטרות, בתוך תקציב וכללים שהוגדרו מראש.", status: "later" },
    ] as { name: string; body: string; status: Status }[],
  },
  control: {
    eyebrow: "שליטה ואבטחה",
    titleA: "ככל שנותנים יותר כוח,",
    titleB: "צריך יותר שליטה.",
    sub: "כל פעולה משמעותית נשארת בשליטתך.",
    points: [
      { title: "אישור לפני פעולות חשובות", body: "מיילים ופגישות מחכים ללחיצה שלך, במערכת או ב״כן״ בשיחה." },
      { title: "הפרדה מוחלטת בין עסקים", body: "לכל עסק סביבה פרטית. אף עסק אחר לא מגיע למידע." },
      { title: "יומן פעולות", body: "כל פעולה מתועדת: מה התבקש, מה נעשה ומי אישר." },
      { title: "הרשאות משתמשים", body: "לכל איש צוות משתמש משלו, כמנהל או כמשתמש." },
      { title: "גישה ניתנת לביטול", body: "מנתקים את Google, והגישה נסגרת." },
      { title: "סודות לא מוצגים למודל", body: "מפתחות הגישה מוצפנים, לא מגיעים למודל ולא מוצגים שוב." },
    ],
    panelTitle: "הרשאות הסוכן",
    panelRows: [
      { tool: "gmail.search", label: "חיפוש וקריאת מיילים", state: "allow" },
      { tool: "gmail.draft", label: "ניסוח טיוטה", state: "allow" },
      { tool: "gmail.send", label: "שליחת מייל", state: "confirm" },
      { tool: "calendar.create", label: "קביעת פגישה", state: "confirm" },
      { tool: "calendar.cancel", label: "ביטול פגישה", state: "confirm" },
    ],
    states: { allow: "מותר", confirm: "דורש אישור", deny: "חסום" },
  },
  future: {
    eyebrow: "הצעד הבא",
    title: "זה רק ההתחלה.",
    sub: "OpsQ גדל מעוזר לעובד דיגיטלי מלא. כל יכולת מסומנת לפי המצב האמיתי שלה.",
    whatsapp: {
      title: "עובד שחי גם ב-WhatsApp",
      body: "מספר WhatsApp משלו. שומרים אותו כאיש קשר ומדברים איתו כמו עם עובד.",
      chatName: "OpsQ",
      examples: ["מה יש לי מחר?", "יותם שלח את החוזה?", "תזיז את הפגישה ל-16:00."],
      same: ["אותו סוכן", "אותו זיכרון", "אותו Gmail", "אותו יומן", "אותן הרשאות"],
      flow: ["ה-WhatsApp שלי", "OpsQ", "העסק שלי"],
    },
    phone: {
      title: "הוא גם יוכל להרים טלפון.",
      body: "שיחות אמיתיות בשם העסק: לברר, לתאם ולקבוע. בתחילת כל שיחה הוא מציג את עצמו כעובד דיגיטלי, לא כאדם.",
      examples: [
        "״תתקשר למוסך ותבדוק מתי יש תור.״",
        "״תתקשר לחנות החיות ותבדוק אם האוכל הקבוע במלאי.״",
        "״תתקשר ללקוח ותתאם איתו פגישה.״",
      ],
      flow: ["משימה", "שיחת טלפון", "שיחה עם אדם אמיתי", "סיכום", "אישור", "ביצוע"],
    },
    browser: {
      title: "אם אין API, הוא יעבוד באתר.",
      body: "גם באתרים בלי חיבור מסודר, הוא יפעל בדפדפן כמו אדם.",
      examples: ["מילוי טפסים", "בדיקת מחירים", "חיפוש שירותים", "הזמנות", "הורדת מסמכים", "העלאת קבצים"],
      prompt: "״תמצא את האפשרות הטובה ביותר ותעצור לפני התשלום.״",
      url: "booking.example.com",
      fields: ["תאריך", "מספר אנשים", "העדפות"],
      stop: "עוצר לפני תשלום · ממתין לאישור",
    },
    shopping: {
      title: "בעתיד, גם קניות וסידורים.",
      prompt: "״נגמר האוכל של הכלב. תזמין שוב את אותו מוצר.״",
      flow: ["זיכרון", "מוצר קבוע", "בדיקת מחיר", "סל", "אישור", "הזמנה"],
      note: "הגבולות והתקציב נקבעים אצלך.",
      budgetTitle: "דוגמה לגבולות תקציב",
      budget: [
        { range: "עד ₪100", rule: "מותר" },
        { range: "₪100–₪500", rule: "דורש אישור" },
        { range: "מעל ₪500", rule: "אישור נוסף" },
      ],
    },
    recurring: {
      title: "לא צריך לבקש כל פעם מחדש.",
      body: "לא רק משימה אחת, אלא אחריות מתמשכת.",
      taskLabel: "משימה",
      taskText: "״תבדוק מה דחוף במייל.״",
      respLabel: "אחריות",
      respText: "״כל בוקר תבדוק מה דחוף במייל.״",
      examples: [
        "״כל יום ראשון תכין לי את השבוע.״",
        "״לקוח לא חזר תוך 3 ימים? תעשה follow-up.״",
        "״כל חודש תבדוק מה חסר ותעדכן.״",
      ],
    },
    personal: {
      title: "לא רק לעסקים.",
      prompt: "״כל בוקר תתקשר לאבא ותבדוק שהכול בסדר.״",
      actions: ["תזכורות", "שיחות ״מה שלומך״", "סידור קניות", "תיאום תורים", "עדכון בן משפחה מורשה", "תיאום לוגיסטי"],
      disclaimer: "OpsQ מתזכר, מתאם ומטפל בסידורים. הוא לא מחליף איש מקצוע רפואי ולא מקבל החלטות רפואיות.",
    },
  },
  roadmap: {
    eyebrow: "מפת דרכים",
    title: "OpsQ רק מתחיל.",
    columns: [
      {
        title: "עובד היום",
        status: "live",
        items: ["Claude של Anthropic", "Gmail: חיפוש, קריאה, טיוטות ושליחה", "יומן Google", "זיכרון ואנשי קשר", "אישורים ויומן פעולות", "סביבה פרטית לכל עסק"],
      },
      {
        title: "בפיתוח",
        status: "dev",
        items: ["WhatsApp", "שיחות טלפון", "ערוצים נוספים"],
      },
      {
        title: "החזון",
        status: "later",
        items: ["Browser Operator", "קניות ותשלומים באישור", "עבודה חוזרת ואוטונומית", "תהליכי עבודה עסקיים", "עוזר אישי ומשפחתי"],
      },
    ] as { title: string; status: Status; items: string[] }[],
  },
  preCta: {
    title: "מה היית רוצה להעביר לעובד שלא מתעייף ולא שוכח?",
    sub: "נראה יחד מה OpsQ יכול לקחת ממך כבר עכשיו.",
    cta: "אני רוצה לראות את זה עובד",
    secondary: "הדגמה קצרה, על העסק שלך.",
  },
  form: {
    eyebrow: "בקשת הדגמה",
    title: "הדגמה על העסק שלך",
    sub: "משאירים פרטים, ונחזור אליך לתאם הדגמה קצרה.",
    name: "שם מלא",
    business: "שם העסק",
    email: "אימייל",
    phone: "טלפון",
    optional: "לא חובה",
    need: "מה היית רוצה להעביר ל-OpsQ?",
    needHint: "לדוגמה: מיילים, follow-up ללידים, תיאום פגישות, משימות חוזרות…",
    submit: "שליחת בקשה",
    sending: "שולח…",
    success: "תודה. נחזור אליך לתאם הדגמה.",
    error: "משהו השתבש בשליחה. אפשר לנסות שוב בעוד רגע.",
    invalid: "צריך למלא שם מלא, אימייל תקין ומספר טלפון.",
    privacy: "הפרטים משמשים רק כדי לחזור אליך לגבי ההדגמה.",
    mailto: "נפתח חלון מייל עם הפרטים. נשאר רק ללחוץ על שליחה.",
    offline: "בגרסת התצוגה הזו הטופס עוד לא מחובר.",
  },
  faq: {
    eyebrow: "שאלות נפוצות",
    title: "תשובות ישרות",
    items: [
      {
        q: "מה OpsQ עושה היום?",
        a: "עובד עם Gmail ויומן Google של העסק: מחפש, מסכם ומנסח מיילים, שולח אחרי אישור, וקובע ומבטל פגישות אחרי אישור. הוא גם זוכר מידע על העסק ומנהל אנשי קשר.",
      },
      {
        q: "מה עדיין בפיתוח?",
        a: "WhatsApp ושיחות טלפון. עבודה באתרים, קניות ומשימות חוזרות יגיעו בהמשך.",
      },
      {
        q: "הוא פועל בלי אישור?",
        a: "כברירת מחדל, לא. לכל פעולה מחליטים: מותר, דורש אישור או חסום. מה שלא אושר, לא מתבצע.",
      },
      {
        q: "איך המידע נשמר?",
        a: "בסביבה פרטית לכל עסק. הגישה ל-Google מוצפנת, לא מגיעה למודל, ואפשר לנתק אותה בכל רגע.",
      },
      {
        q: "הוא רואה מידע של עסקים אחרים?",
        a: "לא. ההפרדה בין עסקים מלאה, ונבדקת בבדיקות שמנסות לפרוץ אותה.",
      },
      {
        q: "איך WhatsApp יעבוד?",
        a: "זה בפיתוח. לסוכן יהיה מספר משלו, ומדברים איתו כמו עם עובד, עם אותו זיכרון, אותם חיבורים ואותן הרשאות. פעולות חשובות יחכו לאישור גם שם.",
      },
      {
        q: "הוא יבצע שיחות טלפון?",
        a: "זה בפיתוח. שיחות קצרות לבירור ותיאום, עם סיכום אליך בסוף.",
      },
      {
        q: "אפשר להגביל תקציב והרשאות?",
        a: "הרשאות לכל פעולה, כבר היום. מגבלות תקציב יגיעו עם יכולות הקנייה.",
      },
      {
        q: "הוא מחליף עובדים?",
        a: "הוא לוקח את העבודה החוזרת: חיפוש, סיכום, ניסוח ותיאום. ההחלטות נשארות אצלך.",
      },
    ],
  },
  footer: {
    tagline: "עובד דיגיטלי לעסק. עושה את העבודה, ומשאיר לך את ההחלטות.",
    rights: "כל הזכויות שמורות.",
  },
};

export type Dictionary = typeof he;

const en: Dictionary = {
  meta: {
    title: "OpsQ — A digital employee for your business",
    description:
      "A digital employee that does the work: summarizes email, prepares replies, sends after approval and schedules meetings. Every business gets its own private environment.",
  },
  status: { live: "Live now", dev: "In development", later: "Later" },
  nav: {
    how: "How it works",
    today: "What it does",
    control: "Control",
    future: "What's next",
    faq: "FAQ",
    cta: "Request a demo",
    menu: "Menu",
    otherLang: "עב",
    otherLangLabel: "עברית",
  },
  hero: {
    eyebrow: "Private to every business",
    titleA: "A digital employee that doesn't just answer.",
    titleB: "It does the work.",
    sub: "Give it a task and it gets done: reading email, preparing replies, scheduling meetings. The important decisions stay with you.",
    primary: "Request a demo",
    secondary: "How it works",
    trust: ["Real actions", "Approval before every important action", "A private environment per business"],
    statusTitle: "The system keeps expanding",
    statusItems: [
      { name: "Gmail", status: "live" },
      { name: "Google Calendar", status: "live" },
      { name: "WhatsApp", status: "dev" },
      { name: "Phone calls", status: "dev" },
      { name: "Browser Operator", status: "later" },
    ],
  },
  demo: {
    window: "New task",
    states: { running: "Working", waiting: "Waiting for approval", done: "Completed" },
    user: "Check whether Yotam sent the contract. If he did, summarize what he wrote and book us a meeting for tomorrow.",
    steps: [
      { tool: "gmail.search", icon: "search", run: "Searching for Yotam's email", done: "Found: \u201cService contract\u201d" },
      { tool: "gmail.read", icon: "mail", run: "Reading the email", done: "Read" },
      { tool: "claude", icon: "spark", run: "Summarizing", done: "Summarized" },
      { tool: "calendar.list", icon: "calendar", run: "Checking tomorrow's calendar", done: "Free at 3 PM" },
    ],
    summaryLabel: "Summary",
    summary: "Yotam sent the contract yesterday. He wants to close by the end of the week and asks about the payment date.",
    pending: "Waiting for your approval",
    action: "Meeting with Yotam",
    detail: "Tomorrow, 3:00–4:00 PM",
    approve: "Approve",
    reject: "Reject",
    approved: "Approved · ran exactly once",
    created: "Added to calendar",
    done: "Meeting booked and logged in the activity history.",
    metrics: { tools: "Tools", approvals: "Approvals", time: "Time" },
  },
  category: {
    eyebrow: "The difference",
    titleA: "Not another chatbot.",
    titleB: "A digital employee.",
    sub: "A chatbot explains how. OpsQ does it, and asks before anything goes out.",
    bot: "A regular chatbot",
    opsq: "OpsQ",
    outcome: "Result",
    examples: [
      {
        tab: "Client reply",
        ask: "Reply to the client who asked about the quote",
        bot: "I can help you write an email. Here's a draft to copy…",
        botOutcome: "Text to copy. The rest is on you.",
        opsq: [
          { text: "I found the client's email.", tool: "gmail.search" },
          { text: "I drafted a reply based on the quote.", tool: "gmail.draft" },
          { text: "You approved, and I sent it.", tool: "gmail.send" },
        ],
        opsqOutcome: "The email went out to the client.",
      },
      {
        tab: "Booking a meeting",
        ask: "Book a meeting with Yotam",
        bot: "To book a meeting, open your calendar and pick a free slot…",
        botOutcome: "An explanation. No meeting booked.",
        opsq: [
          { text: "I found Yotam in your contacts.", tool: "contacts.search" },
          { text: "I checked the calendar: tomorrow at 10:00 is free.", tool: "calendar.list" },
          { text: "You approved, and I booked it.", tool: "calendar.create" },
        ],
        opsqOutcome: "The meeting is on the calendar.",
      },
    ],
  },
  how: {
    eyebrow: "How it works",
    titleA: "Say what needs to happen.",
    titleB: "OpsQ handles the rest.",
    steps: [
      {
        title: "Connect your business",
        body: "Gmail and Google Calendar today. WhatsApp next.",
        quotes: [],
      },
      {
        title: "Talk to it like an employee",
        body: "",
        quotes: ["“Summarize the important emails.”", "“Book a meeting with Yotam.”", "“Draft a reply to the client.”"],
      },
      {
        title: "OpsQ executes",
        body: "It picks the tools, asks for approval when needed and reports back when done.",
        quotes: [],
      },
    ],
  },
  flow: {
    eyebrow: "From request to result",
    titleA: "Not a tool.",
    titleB: "A system that finishes tasks.",
    request: "“Handle the meeting with Yotam”",
    steps: [
      { label: "Understands the goal", tool: "" },
      { label: "Looks up Yotam", tool: "contacts.search" },
      { label: "Checks Gmail", tool: "gmail.search" },
      { label: "Checks the calendar", tool: "calendar.list" },
      { label: "Finds a free slot", tool: "" },
      { label: "Asks for approval", tool: "approval", approval: true },
      { label: "Books the meeting", tool: "calendar.create" },
      { label: "Emails Yotam an update", tool: "gmail.send" },
      { label: "Done", tool: "", done: true },
    ],
    note: "Every step works today. Sending the email and booking the meeting wait for approval.",
  },
  capabilities: {
    eyebrow: "Live now",
    title: "What it already does today",
    sub: "In your business's real accounts.",
    items: [
      { icon: "search", title: "Email search and summaries", body: "Finds what matters and sums it up in a few lines." },
      { icon: "pen", title: "Drafts and replies", body: "Prepares a reply to a client or supplier." },
      { icon: "send", title: "Sending email", body: "Only after your approval." },
      { icon: "calendar", title: "Calendar management", body: "Checks availability, and books and cancels meetings after approval." },
      { icon: "memory", title: "Business memory", body: "Remembers preferences and context. No need to explain twice." },
      { icon: "contacts", title: "Contacts", body: "Saves and finds contact details." },
      { icon: "chat", title: "Direct chat", body: "Write it a task in plain language, in Hebrew or English." },
    ],
  },
  useCases: {
    eyebrow: "Roles",
    title: "One employee. Dozens of roles.",
    sub: "✓ works today. The rest is on the way.",
    groups: [
      {
        title: "Sales",
        items: [
          { text: "Booking meetings", status: "live" },
          { text: "Lead follow-ups", status: "later" },
          { text: "Reminders", status: "later" },
        ],
      },
      {
        title: "Customer service",
        items: [
          { text: "Summarizing email enquiries", status: "live" },
          { text: "Preparing replies", status: "live" },
          { text: "Scheduling follow-up care", status: "live" },
        ],
      },
      {
        title: "Personal management",
        items: [
          { text: "Email", status: "live" },
          { text: "Calendar", status: "live" },
          { text: "Scheduling", status: "live" },
          { text: "Reminders", status: "later" },
        ],
      },
      {
        title: "Suppliers",
        items: [
          { text: "Enquiries by email", status: "live" },
          { text: "Coordination", status: "live" },
          { text: "Automatic tracking", status: "later" },
        ],
      },
      {
        title: "Administration",
        items: [
          { text: "Forms", status: "later" },
          { text: "Documents", status: "later" },
          { text: "Recurring tasks", status: "later" },
        ],
      },
    ],
  },
  autonomy: {
    eyebrow: "Levels of autonomy",
    title: "How much freedom does it get? Your call.",
    sub: "Set it per action. Start careful and widen it over time.",
    levels: [
      { name: "Assistant", body: "Prepares and suggests. Nothing goes out.", status: "live" },
      { name: "Employee with approval", body: "Prepares everything and acts after approval. The default.", status: "live" },
      { name: "Trusted employee", body: "Routine runs on its own. Important decisions come to you.", status: "live" },
      { name: "Autonomous", body: "Works toward goals, within a budget and rules set in advance.", status: "later" },
    ],
  },
  control: {
    eyebrow: "Control & security",
    titleA: "The more power you give,",
    titleB: "the more control you need.",
    sub: "Every meaningful action stays under your control.",
    points: [
      { title: "Approval before important actions", body: "Emails and meetings wait for your click, in the dashboard or with a “yes” in the chat." },
      { title: "Complete separation between businesses", body: "Every business has a private environment. No other business can reach its data." },
      { title: "Activity log", body: "Every action is recorded: what was asked, what was done and who approved it." },
      { title: "User permissions", body: "Every team member has their own user, as an admin or a regular user." },
      { title: "Revocable access", body: "Disconnect Google and the access is closed." },
      { title: "Secrets never shown to the model", body: "Access keys are encrypted, never reach the model and are never shown again." },
    ],
    panelTitle: "Agent permissions",
    panelRows: [
      { tool: "gmail.search", label: "Search and read email", state: "allow" },
      { tool: "gmail.draft", label: "Draft a reply", state: "allow" },
      { tool: "gmail.send", label: "Send email", state: "confirm" },
      { tool: "calendar.create", label: "Book a meeting", state: "confirm" },
      { tool: "calendar.cancel", label: "Cancel a meeting", state: "confirm" },
    ],
    states: { allow: "Allowed", confirm: "Needs approval", deny: "Blocked" },
  },
  future: {
    eyebrow: "What's next",
    title: "This is just the beginning.",
    sub: "OpsQ is growing from an assistant into a full digital employee. Every capability is labeled with its real status.",
    whatsapp: {
      title: "An employee that lives on WhatsApp too",
      body: "Its own WhatsApp number. Save it as a contact and talk to it like an employee.",
      chatName: "OpsQ",
      examples: ["What's on tomorrow?", "Did Yotam send the contract?", "Move the meeting to 4 PM."],
      same: ["Same agent", "Same memory", "Same Gmail", "Same calendar", "Same permissions"],
      flow: ["My WhatsApp", "OpsQ", "My business"],
    },
    phone: {
      title: "It will pick up the phone, too.",
      body: "Real calls on your behalf: to check, coordinate and book. At the start of every call it introduces itself as a digital employee, not a person.",
      examples: [
        "“Call the garage and check when they have a slot.”",
        "“Call the pet shop and check the usual food is in stock.”",
        "“Call the client and set up a meeting.”",
      ],
      flow: ["Task", "Phone call", "Talks to a real person", "Summary", "Approval", "Action"],
    },
    browser: {
      title: "No API? It will work the website.",
      body: "Even on sites with no proper integration, it will work the browser like a person.",
      examples: ["Filling in forms", "Comparing prices", "Finding services", "Bookings", "Downloading documents", "Uploading files"],
      prompt: "“Find the best option and stop before payment.”",
      url: "booking.example.com",
      fields: ["Date", "Party size", "Preferences"],
      stop: "Stops before payment · waiting for approval",
    },
    shopping: {
      title: "Later on, shopping and errands.",
      prompt: "“The dog's food ran out. Reorder the same product.”",
      flow: ["Memory", "Usual product", "Price check", "Cart", "Approval", "Order"],
      note: "You set the limits and the budget.",
      budgetTitle: "Example budget limits",
      budget: [
        { range: "Up to ₪100", rule: "Allowed" },
        { range: "₪100–₪500", rule: "Needs approval" },
        { range: "Over ₪500", rule: "Extra approval" },
      ],
    },
    recurring: {
      title: "No need to ask every time.",
      body: "Not just one task, but ongoing responsibility.",
      taskLabel: "Task",
      taskText: "“Check what's urgent in the inbox.”",
      respLabel: "Responsibility",
      respText: "“Every morning, check what's urgent in the inbox.”",
      examples: [
        "“Every Sunday, prepare my week.”",
        "“Client hasn't replied in 3 days? Follow up.”",
        "“Every month, check what's missing and update.”",
      ],
    },
    personal: {
      title: "Not only for businesses.",
      prompt: "“Every morning, call Dad and check everything is okay.”",
      actions: ["Reminders", "Check-in calls", "Organizing shopping", "Booking appointments", "Notifying an authorized family member", "Coordinating logistics"],
      disclaimer: "OpsQ reminds, coordinates and runs errands. It does not replace a medical professional or make medical decisions.",
    },
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "OpsQ is just getting started.",
    columns: [
      {
        title: "Works today",
        status: "live",
        items: ["Claude by Anthropic", "Gmail: search, read, drafts and sending", "Google Calendar", "Memory and contacts", "Approvals and activity log", "A private environment per business"],
      },
      { title: "In development", status: "dev", items: ["WhatsApp", "Phone calls", "More channels"] },
      {
        title: "The vision",
        status: "later",
        items: ["Browser Operator", "Purchases and payments with approval", "Recurring, autonomous work", "Business workflows", "Personal and family assistant"],
      },
    ],
  },
  preCta: {
    title: "What would you hand to an employee who never tires and never forgets?",
    sub: "Let's see together what OpsQ can take off your plate right now.",
    cta: "I want to see it working",
    secondary: "A short demo, on your own business.",
  },
  form: {
    eyebrow: "Request a demo",
    title: "A demo on your own business",
    sub: "Leave your details and we'll get back to you to set up a short demo.",
    name: "Full name",
    business: "Business name",
    email: "Email",
    phone: "Phone",
    optional: "optional",
    need: "What would you hand over to OpsQ?",
    needHint: "For example: email, lead follow-ups, scheduling meetings, recurring tasks…",
    submit: "Send request",
    sending: "Sending…",
    success: "Thank you. We'll be in touch to set up a demo.",
    error: "Something went wrong while sending. Please try again in a moment.",
    invalid: "Please fill in your full name, a valid email and a phone number.",
    privacy: "Your details are only used to get back to you about the demo.",
    mailto: "An email window opened with your details. Just press send.",
    offline: "The form isn't connected in this preview version yet.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Straight answers",
    items: [
      {
        q: "What does OpsQ do today?",
        a: "It works with your business's Gmail and Google Calendar: searches, summarizes and drafts email, sends after approval, and books and cancels meetings after approval. It also remembers details about the business and manages contacts.",
      },
      {
        q: "What is still in development?",
        a: "WhatsApp and phone calls. Working on websites, shopping and recurring tasks come later.",
      },
      {
        q: "Does it act without approval?",
        a: "Not by default. For each action you choose: allowed, needs approval, or blocked. Anything not approved doesn't run.",
      },
      {
        q: "How is data stored?",
        a: "In a private environment per business. Google access is encrypted, never reaches the model, and can be disconnected at any time.",
      },
      {
        q: "Can it see other businesses' data?",
        a: "No. Businesses are fully separated, and that separation is covered by tests that try to break it.",
      },
      {
        q: "How will WhatsApp work?",
        a: "It's in development. The agent will have its own number, and you talk to it like an employee, with the same memory, connections and permissions. Important actions will wait for approval there too.",
      },
      {
        q: "Will it make phone calls?",
        a: "It's in development. Short calls to check and coordinate, with a summary sent to you afterwards.",
      },
      {
        q: "Can I limit budget and permissions?",
        a: "Per-action permissions, today. Budget limits will come with the shopping capabilities.",
      },
      {
        q: "Does it replace employees?",
        a: "It takes the repetitive work: searching, summarizing, drafting and scheduling. Decisions stay with you.",
      },
    ],
  },
  footer: {
    tagline: "A digital employee for your business. It does the work and leaves the decisions to you.",
    rights: "All rights reserved.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { he, en };
