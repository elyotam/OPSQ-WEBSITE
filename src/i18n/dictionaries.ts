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
 */
export type Status = "live" | "dev" | "later";

const he = {
  meta: {
    title: "OpsQ — עובד דיגיטלי פרטי לעסק",
    description:
      "עובד דיגיטלי שלא רק עונה, אלא עושה את העבודה: קורא ומסכם מיילים, מנסח ושולח תשובות אחרי אישור, ומתאם פגישות ביומן. כל עסק בסביבה פרטית משלו.",
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
    eyebrow: "עובד דיגיטלי פרטי לעסק",
    titleA: "עובד דיגיטלי שלא רק עונה.",
    titleB: "הוא עושה את העבודה.",
    sub: "OpsQ מקבל משימות, מתחבר לכלים של העסק ומבצע פעולות אמיתיות: מיילים, יומן, תיאומים ומשימות. את ההחלטות החשובות הוא משאיר אצלך.",
    primary: "בקשת הדגמה",
    secondary: "לראות איך זה עובד",
    trust: ["פעולות אמיתיות", "אישור לפני פעולות חשובות", "כל לקוח בסביבה פרטית משלו"],
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
    live: "מבצע",
    user: "תבדוק אם יותם שלח את החוזה. אם כן, תסכם לי מה הוא כתב ותקבע לנו פגישה למחר.",
    steps: [
      { tool: "gmail.search", label: "נמצא מייל מיותם" },
      { tool: "gmail.read", label: "נקרא" },
      { tool: "claude", label: "סוכם" },
      { tool: "calendar.list", label: "פנוי מחר ב-15:00" },
    ],
    summary: "יותם שלח את החוזה אתמול. הוא מבקש לסגור עד סוף השבוע, ויש לו שאלה אחת על מועד התשלום.",
    pending: "ממתין לאישור",
    action: "פגישה עם יותם",
    detail: "מחר, 15:00–16:00",
    approve: "אישור",
    reject: "דחייה",
    approved: "בוצע",
    done: "הפגישה נקבעה. הכול מתועד ביומן הפעולות.",
  },
  category: {
    eyebrow: "ההבדל",
    titleA: "לא עוד צ׳אטבוט.",
    titleB: "עובד דיגיטלי.",
    sub: "צ׳אטבוט מסביר איך עושים. OpsQ עושה, ומבקש אישור לפני שמשהו יוצא החוצה.",
    bot: "צ׳אטבוט רגיל",
    opsq: "OpsQ",
    examples: [
      {
        ask: "תענה ללקוח ששאל על ההצעה",
        bot: ["אני יכול לעזור לך לנסח מייל. הנה טיוטה שאפשר להעתיק…"],
        opsq: ["מצאתי את המייל.", "הכנתי תשובה.", "אחרי האישור שלך, שלחתי אותה."],
        tools: ["gmail.search", "gmail.draft", "gmail.send"],
      },
      {
        ask: "תקבע פגישה עם דני",
        bot: ["כדי לקבוע פגישה, אפשר לפתוח את היומן ולבחור שעה פנויה…"],
        opsq: ["בדקתי את היומן.", "מצאתי שעה פנויה מחר ב-10:00.", "לאשר את הפגישה?"],
        tools: ["contacts.search", "calendar.list", "calendar.create"],
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
        body: "Gmail ויומן Google כבר עכשיו. WhatsApp וכלים נוספים בהמשך.",
        quotes: [] as string[],
      },
      {
        title: "מדברים איתו כמו עם עובד",
        body: "",
        quotes: ["״תסכם לי את המיילים החשובים.״", "״תקבע פגישה עם דני.״", "״תכין תשובה ללקוח.״"],
      },
      {
        title: "OpsQ מבצע",
        body: "משתמש בכלים הנכונים, מבקש אישור כשצריך, ומעדכן כשהמשימה הושלמה.",
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
    note: "כל השלבים כאן עובדים כבר היום. שליחת המייל וקביעת הפגישה מחכות לאישור.",
  },
  capabilities: {
    eyebrow: "זמין עכשיו",
    title: "מה OpsQ כבר עושה היום",
    sub: "עבודה אמיתית, בחשבונות האמיתיים של העסק.",
    items: [
      { icon: "search", title: "סיכום וחיפוש מיילים", body: "מוצא את מה שחשוב, קורא ומסכם בכמה שורות." },
      { icon: "pen", title: "טיוטות ותשובות", body: "מכין תשובה ללקוח או לספק." },
      { icon: "send", title: "שליחת מייל", body: "מבקש אישור, ורק אז שולח." },
      { icon: "calendar", title: "ניהול יומן", body: "קורא זמינות, מוצא זמן פנוי, ויוצר ומבטל פגישות אחרי אישור." },
      { icon: "memory", title: "זיכרון עסקי", body: "זוכר העדפות, הקשר ומידע, כדי שלא צריך להסביר הכול מחדש." },
      { icon: "contacts", title: "אנשי קשר", body: "שומר ומאתר אנשים ופרטי קשר." },
      { icon: "chat", title: "שיחה ישירה עם העובד הדיגיטלי", body: "נותנים משימה בשפה טבעית, בעברית או באנגלית." },
    ],
  },
  useCases: {
    eyebrow: "תפקידים",
    title: "עובד אחד. עשרות תפקידים.",
    sub: "מה שמסומן ב-✓ עובד כבר היום. השאר בדרך.",
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
    sub: "הגבולות נקבעים אצלך, לכל פעולה בנפרד. אפשר להתחיל זהיר ולהרחיב עם הזמן.",
    levels: [
      { name: "עוזר", body: "מציע ומכין בלבד. שום דבר לא יוצא החוצה.", status: "live" },
      { name: "עובד עם אישור", body: "מכין הכול, ומבצע רק אחרי אישור. זו ברירת המחדל.", status: "live" },
      { name: "עובד מהימן", body: "פעולות שגרתיות מתבצעות לבד. החלטות חשובות מגיעות לאישור.", status: "live" },
      {
        name: "אוטונומי",
        body: "מקבל מטרות ואחריות, ופועל בתוך תקציב, הרשאות וכללים שהוגדרו מראש.",
        status: "later",
      },
    ] as { name: string; body: string; status: Status }[],
  },
  control: {
    eyebrow: "שליטה ואבטחה",
    titleA: "ככל שנותנים יותר כוח,",
    titleB: "צריך יותר שליטה.",
    sub: "כל פעולה משמעותית ניתנת לבקרה.",
    points: [
      { title: "אישור לפני פעולות חשובות", body: "שליחת מייל, קביעה או ביטול של פגישה מחכים ללחיצה שלך. אפשר לאשר במערכת או לענות ״כן״ בשיחה." },
      { title: "הפרדה מוחלטת בין עסקים", body: "כל עסק בסביבה פרטית משלו. עסק אחר לא יכול להגיע למידע, בשום מסלול." },
      { title: "יומן פעולות", body: "כל פעולה מתועדת: מה התבקש, מה נעשה ומי אישר." },
      { title: "הרשאות משתמשים", body: "כל איש צוות נכנס עם משתמש משלו, בהרשאת מנהל או משתמש." },
      { title: "גישה ניתנת לביטול", body: "מנתקים את Google, והגישה נסגרת." },
      { title: "סודות לא מוצגים למודל", body: "מפתחות הגישה נשמרים מוצפנים, ולא מגיעים למודל ולא מוצגים שוב בשום מסך." },
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
    sub: "OpsQ נבנה כדי לגדול מעוזר לעובד דיגיטלי מלא, שמבצע עבודה בעולם האמיתי. כל יכולת כאן מסומנת לפי המצב האמיתי שלה.",
    whatsapp: {
      title: "עובד שחי גם ב-WhatsApp",
      body: "לסוכן יהיה מספר WhatsApp משלו. שומרים אותו כאיש קשר, ומדברים איתו כמו עם עובד.",
      chatName: "OpsQ",
      examples: ["מה יש לי מחר?", "דני שלח את החוזה?", "תזיז את הפגישה ל-16:00."],
      same: ["אותו סוכן", "אותו זיכרון", "אותו Gmail", "אותו יומן", "אותן הרשאות"],
      flow: ["ה-WhatsApp שלי", "OpsQ", "העסק שלי"],
    },
    phone: {
      title: "הוא גם יוכל להרים טלפון.",
      body: "OpsQ נבנה כדי לבצע שיחות אמיתיות בשם העסק: לברר, לתאם, לקבוע ולעדכן. בתחילת כל שיחה הוא מציג את עצמו כעובד דיגיטלי, לא כאדם.",
      examples: [
        "״תתקשר למוסך ותבדוק מתי יש תור.״",
        "״תתקשר לחנות החיות ותבדוק אם האוכל הקבוע במלאי.״",
        "״תתקשר ללקוח ותתאם איתו פגישה.״",
      ],
      flow: ["משימה", "שיחת טלפון", "שיחה עם אדם אמיתי", "סיכום", "אישור", "ביצוע"],
    },
    browser: {
      title: "אם אין API, הוא יעבוד באתר.",
      body: "OpsQ נבנה כדי להשתמש גם באתרים, ולבצע פעולות בדפדפן כמו אדם.",
      examples: ["מילוי טפסים", "בדיקת מחירים", "חיפוש שירותים", "הזמנות", "הורדת מסמכים", "העלאת קבצים", "עבודה מול מערכות עסקיות"],
      prompt: "״תמצא לי את האפשרות הטובה ביותר ותגיע עד שלב התשלום.״",
      url: "booking.example.com",
      fields: ["תאריך", "מספר אנשים", "העדפות"],
      stop: "עוצר לפני תשלום · ממתין לאישור",
    },
    shopping: {
      title: "בעתיד, גם קניות וסידורים.",
      prompt: "״נגמר האוכל של הכלבה. תזמין שוב את אותו מוצר.״",
      flow: ["זיכרון", "מוצר קבוע", "בדיקת מחיר", "סל", "אישור", "הזמנה"],
      note: "הלקוח תמיד קובע את גבולות ההרשאה והתקציב.",
      budgetTitle: "דוגמה לגבולות תקציב",
      budget: [
        { range: "עד ₪100", rule: "מותר" },
        { range: "₪100–₪500", rule: "דורש אישור" },
        { range: "מעל ₪500", rule: "אישור נוסף" },
      ],
    },
    recurring: {
      title: "לא צריך לבקש כל פעם מחדש.",
      body: "OpsQ יוכל לקבל אחריות מתמשכת, ולא רק משימה אחת.",
      taskLabel: "משימה",
      taskText: "״תבדוק מה דחוף במייל.״",
      respLabel: "אחריות",
      respText: "״כל בוקר תבדוק מה דחוף במייל.״",
      examples: [
        "״כל יום ראשון תכין לי את השבוע.״",
        "״אם לקוח לא חזר תוך 3 ימים, תעשה follow-up.״",
        "״כל חודש תבדוק מה חסר ותעדכן.״",
      ],
    },
    personal: {
      title: "לא רק לעסקים.",
      prompt: "״כל בוקר תתקשר לאבא ותבדוק שהכול בסדר.״",
      actions: ["תזכורות", "שיחות ״מה שלומך״", "סידור קניות", "תיאום תורים", "עדכון בן משפחה מורשה", "תיאום לוגיסטי"],
      disclaimer: "OpsQ יכול לתזכר, לתאם ולבצע משימות אדמיניסטרטיביות. הוא לא מחליף איש מקצוע רפואי ולא מקבל החלטות רפואיות.",
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
        items: ["Browser Operator", "קניות ותשלומים באישור", "עבודה חוזרת ואוטונומית", "תהליכי עבודה עסקיים עמוקים", "עוזר אישי ומשפחתי"],
      },
    ] as { title: string; status: Status; items: string[] }[],
  },
  preCta: {
    title: "מה היית רוצה להעביר לעובד שלא מתעייף, לא שוכח, וזמין כשצריך?",
    sub: "מה גוזל הכי הרבה זמן בעסק? נבין יחד איך OpsQ יכול לקחת את זה על עצמו.",
    cta: "אני רוצה לראות את זה עובד",
    secondary: "רוצה לראות אם OpsQ מתאים לעסק שלך?",
  },
  form: {
    eyebrow: "בקשת הדגמה",
    title: "הדגמה על העסק שלך",
    sub: "משאירים פרטים, ונחזור אליך כדי להבין איזו עבודה אפשר להעביר ל-OpsQ.",
    name: "שם מלא",
    business: "שם העסק",
    email: "אימייל",
    phone: "טלפון",
    optional: "לא חובה",
    need: "איזו עבודה היית רוצה להעביר ל-OpsQ?",
    needHint: "לדוגמה: לטפל במיילים, לעשות follow-up ללידים, לתאם פגישות, לדבר עם לקוחות, לנהל משימות חוזרות…",
    submit: "שליחת בקשה",
    sending: "שולח…",
    success: "תודה. נחזור אליך כדי להבין איזו עבודה אפשר להעביר ל-OpsQ.",
    error: "משהו השתבש בשליחה. אפשר לנסות שוב בעוד רגע.",
    invalid: "צריך למלא שם, שם עסק ואימייל תקין.",
    privacy: "הפרטים משמשים רק כדי לחזור אליך לגבי ההדגמה.",
    mailto: "נפתח חלון מייל עם הפרטים. נשאר רק ללחוץ על שליחה.",
    offline: "בגרסת התצוגה הזו הטופס עוד לא מחובר.",
  },
  faq: {
    eyebrow: "שאלות נפוצות",
    title: "תשובות ישרות",
    items: [
      {
        q: "מה OpsQ באמת עושה היום?",
        a: "הוא מחובר ל-Gmail וליומן Google של העסק. הוא מחפש, קורא ומסכם מיילים, מנסח תשובות ושולח אותן אחרי אישור, בודק זמינות, וקובע ומבטל פגישות אחרי אישור. הוא גם זוכר מידע על העסק ומנהל אנשי קשר. כל זה עובד מול החשבונות האמיתיים, עם Claude של Anthropic.",
      },
      {
        q: "מה עדיין בפיתוח?",
        a: "WhatsApp ושיחות טלפון נמצאים בפיתוח. עבודה באתרים, קניות, משימות חוזרות ורמת אוטונומיה מלאה הן יכולות להמשך. כל יכולת באתר מסומנת לפי המצב האמיתי שלה.",
      },
      {
        q: "הוא יכול לבצע פעולות בלי אישור?",
        a: "כברירת מחדל, לא. שליחת מייל ושינויים ביומן מחכים לאישור. אפשר לשנות את זה לכל פעולה בנפרד: לאפשר, לדרוש אישור או לחסום. בקשה שלא אושרה פשוט לא מתבצעת.",
      },
      {
        q: "איך המידע נשמר?",
        a: "כל עסק מקבל סביבה פרטית משלו. הגישה ל-Google נשמרת מוצפנת, לא מוצגת שוב בשום מסך ולא מגיעה למודל. אפשר לנתק את החיבור בכל רגע.",
      },
      {
        q: "הוא רואה מידע של לקוחות אחרים?",
        a: "לא. המידע של כל עסק מופרד לגמרי, וההפרדה נבדקת בבדיקות שמנסות לפרוץ אותה.",
      },
      {
        q: "איך WhatsApp יעבוד?",
        a: "זה בפיתוח ועוד לא זמין. הכוונה: מדברים עם הסוכן ב-WhatsApp כמו עם עובד, והוא עובד עם אותו זיכרון, אותם חיבורים ואותן הרשאות כמו במערכת. פעולות חשובות יחכו לאישור גם שם.",
      },
      {
        q: "יהיה לו מספר משלו?",
        a: "זה הכיוון: לכל סוכן יחובר מספר WhatsApp משלו, שאפשר לשמור כאיש קשר. זה עוד לא זמין.",
      },
      {
        q: "הוא יוכל לבצע שיחות טלפון?",
        a: "זה בפיתוח ועוד לא זמין. הכוונה היא שיחות קצרות לבירור ותיאום, שבתחילתן הוא מציג את עצמו כעובד דיגיטלי, ובסופן מגיע אליך סיכום.",
      },
      {
        q: "הוא יוכל לבצע פעולות באתרים?",
        a: "זה בהמשך הדרך. המטרה היא לעבוד גם באתרים שאין להם חיבור מסודר, למשל למלא טפסים או לבדוק מחירים, ולעצור לאישור לפני כל תשלום.",
      },
      {
        q: "אפשר לקבוע מגבלות תקציב והרשאה?",
        a: "הרשאות לכל פעולה אפשר לקבוע כבר היום. מגבלות תקציב יגיעו יחד עם יכולות הקנייה והתשלום, שהן בהמשך הדרך.",
      },
      {
        q: "הוא מחליף עובדים?",
        a: "הוא לוקח ממך עבודה שחוזרת על עצמה: חיפוש, סיכום, ניסוח ותיאום. ההחלטות נשארות אצל אנשים.",
      },
    ],
  },
  footer: {
    tagline: "עובד דיגיטלי פרטי לעסק. מבצע את העבודה, ומשאיר אצלך את ההחלטות.",
    rights: "כל הזכויות שמורות.",
  },
};

export type Dictionary = typeof he;

const en: Dictionary = {
  meta: {
    title: "OpsQ — A private digital employee for your business",
    description:
      "A digital employee that doesn't just answer, it does the work: reads and summarizes email, drafts and sends replies after approval, and schedules meetings. Every business gets its own private environment.",
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
    eyebrow: "A private digital employee for your business",
    titleA: "A digital employee that doesn't just answer.",
    titleB: "It does the work.",
    sub: "OpsQ takes on tasks, connects to your business's tools and takes real action: email, calendar, scheduling and tasks. The important decisions stay with you.",
    primary: "Request a demo",
    secondary: "See how it works",
    trust: ["Real actions", "Approval before important actions", "Every customer in a private environment"],
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
    live: "Working",
    user: "Check whether Yotam sent the contract. If he did, summarize what he wrote and book us a meeting for tomorrow.",
    steps: [
      { tool: "gmail.search", label: "Found Yotam's email" },
      { tool: "gmail.read", label: "Read" },
      { tool: "claude", label: "Summarized" },
      { tool: "calendar.list", label: "Free tomorrow at 3 PM" },
    ],
    summary: "Yotam sent the contract yesterday. He wants to close by the end of the week and has one question about the payment date.",
    pending: "Waiting for approval",
    action: "Meeting with Yotam",
    detail: "Tomorrow, 3:00–4:00 PM",
    approve: "Approve",
    reject: "Reject",
    approved: "Done",
    done: "The meeting is booked. Everything is in the activity log.",
  },
  category: {
    eyebrow: "The difference",
    titleA: "Not another chatbot.",
    titleB: "A digital employee.",
    sub: "A chatbot explains how. OpsQ does it, and asks for approval before anything leaves the building.",
    bot: "A regular chatbot",
    opsq: "OpsQ",
    examples: [
      {
        ask: "Reply to the client who asked about the quote",
        bot: ["I can help you write an email. Here's a draft you can copy…"],
        opsq: ["I found the email.", "I prepared a reply.", "After your approval, I sent it."],
        tools: ["gmail.search", "gmail.draft", "gmail.send"],
      },
      {
        ask: "Book a meeting with Danny",
        bot: ["To book a meeting, open your calendar and pick a free slot…"],
        opsq: ["I checked the calendar.", "Tomorrow at 10:00 is free.", "Approve the meeting?"],
        tools: ["contacts.search", "calendar.list", "calendar.create"],
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
        body: "Gmail and Google Calendar today. WhatsApp and more tools later.",
        quotes: [],
      },
      {
        title: "Talk to it like an employee",
        body: "",
        quotes: ["“Summarize the important emails.”", "“Book a meeting with Danny.”", "“Draft a reply to the client.”"],
      },
      {
        title: "OpsQ executes",
        body: "It uses the right tools, asks for approval when needed, and reports back when the task is done.",
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
    note: "Every step here works today. Sending the email and booking the meeting wait for approval.",
  },
  capabilities: {
    eyebrow: "Live now",
    title: "What OpsQ already does today",
    sub: "Real work, in your business's real accounts.",
    items: [
      { icon: "search", title: "Email search and summaries", body: "Finds what matters, reads it and sums it up in a few lines." },
      { icon: "pen", title: "Drafts and replies", body: "Prepares a reply to a client or supplier." },
      { icon: "send", title: "Sending email", body: "Asks for approval, and only then sends." },
      { icon: "calendar", title: "Calendar management", body: "Reads availability, finds free time, and creates and cancels meetings after approval." },
      { icon: "memory", title: "Business memory", body: "Remembers preferences, context and details, so you don't have to explain everything again." },
      { icon: "contacts", title: "Contacts", body: "Saves and finds people and their details." },
      { icon: "chat", title: "Direct chat with your digital employee", body: "Give it a task in plain language, in Hebrew or English." },
    ],
  },
  useCases: {
    eyebrow: "Roles",
    title: "One employee. Dozens of roles.",
    sub: "Items marked ✓ work today. The rest are on the way.",
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
    sub: "You set the limits, per action. Start careful and widen them over time.",
    levels: [
      { name: "Assistant", body: "Suggests and prepares only. Nothing leaves the building.", status: "live" },
      { name: "Employee with approval", body: "Prepares everything and acts only after approval. This is the default.", status: "live" },
      { name: "Trusted employee", body: "Routine actions run on their own. Important decisions come to you.", status: "live" },
      { name: "Autonomous", body: "Takes goals and responsibility, and works within a budget, permissions and rules set in advance.", status: "later" },
    ],
  },
  control: {
    eyebrow: "Control & security",
    titleA: "The more power you give,",
    titleB: "the more control you need.",
    sub: "Every meaningful action can be controlled.",
    points: [
      { title: "Approval before important actions", body: "Sending email, booking or cancelling a meeting all wait for your click. Approve in the dashboard or reply “yes” in the chat." },
      { title: "Complete separation between businesses", body: "Every business has its own private environment. No other business can reach its data, by any route." },
      { title: "Activity log", body: "Every action is recorded: what was asked, what was done and who approved it." },
      { title: "User permissions", body: "Every team member signs in with their own user, as an admin or a regular user." },
      { title: "Revocable access", body: "Disconnect Google and the access is closed." },
      { title: "Secrets never shown to the model", body: "Access keys are stored encrypted, never reach the model and are never shown again on any screen." },
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
    sub: "OpsQ is being built to grow from an assistant into a full digital employee that does real-world work. Every capability here is labeled with its real status.",
    whatsapp: {
      title: "An employee that lives on WhatsApp too",
      body: "The agent will have its own WhatsApp number. Save it as a contact and talk to it like an employee.",
      chatName: "OpsQ",
      examples: ["What's on tomorrow?", "Did Danny send the contract?", "Move the meeting to 4 PM."],
      same: ["Same agent", "Same memory", "Same Gmail", "Same calendar", "Same permissions"],
      flow: ["My WhatsApp", "OpsQ", "My business"],
    },
    phone: {
      title: "It will pick up the phone, too.",
      body: "OpsQ is being built to make real calls on your behalf: to check, coordinate, book and update. At the start of every call it introduces itself as a digital employee, not a person.",
      examples: [
        "“Call the garage and check when they have a slot.”",
        "“Call the pet shop and check the usual food is in stock.”",
        "“Call the client and set up a meeting.”",
      ],
      flow: ["Task", "Phone call", "Talks to a real person", "Summary", "Approval", "Action"],
    },
    browser: {
      title: "No API? It will work the website.",
      body: "OpsQ is being built to use websites too, taking action in the browser the way a person does.",
      examples: ["Filling in forms", "Comparing prices", "Finding services", "Bookings", "Downloading documents", "Uploading files", "Working in business systems"],
      prompt: "“Find the best option and take it up to the payment step.”",
      url: "booking.example.com",
      fields: ["Date", "Party size", "Preferences"],
      stop: "Stops before payment · waiting for approval",
    },
    shopping: {
      title: "Later on, shopping and errands.",
      prompt: "“The dog's food ran out. Reorder the same product.”",
      flow: ["Memory", "Usual product", "Price check", "Cart", "Approval", "Order"],
      note: "The customer always sets the permission and budget limits.",
      budgetTitle: "Example budget limits",
      budget: [
        { range: "Up to ₪100", rule: "Allowed" },
        { range: "₪100–₪500", rule: "Needs approval" },
        { range: "Over ₪500", rule: "Extra approval" },
      ],
    },
    recurring: {
      title: "No need to ask every time.",
      body: "OpsQ will be able to take on ongoing responsibility, not just a single task.",
      taskLabel: "Task",
      taskText: "“Check what's urgent in the inbox.”",
      respLabel: "Responsibility",
      respText: "“Every morning, check what's urgent in the inbox.”",
      examples: [
        "“Every Sunday, prepare my week.”",
        "“If a client hasn't replied in 3 days, follow up.”",
        "“Every month, check what's missing and update.”",
      ],
    },
    personal: {
      title: "Not only for businesses.",
      prompt: "“Every morning, call Dad and check everything is okay.”",
      actions: ["Reminders", "Check-in calls", "Organizing shopping", "Booking appointments", "Notifying an authorized family member", "Coordinating logistics"],
      disclaimer: "OpsQ can remind, coordinate and handle administrative tasks. It does not replace a medical professional and does not make medical decisions.",
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
        items: ["Browser Operator", "Purchases and payments with approval", "Recurring, autonomous work", "Deeper business workflows", "Personal and family assistant"],
      },
    ],
  },
  preCta: {
    title: "What would you hand to an employee who never tires, never forgets, and is there when needed?",
    sub: "What takes up the most time in your business? Let's see together how OpsQ can take it on.",
    cta: "I want to see it working",
    secondary: "Want to see if OpsQ fits your business?",
  },
  form: {
    eyebrow: "Request a demo",
    title: "A demo on your own business",
    sub: "Leave your details and we'll get back to you to understand which work you could hand over to OpsQ.",
    name: "Full name",
    business: "Business name",
    email: "Email",
    phone: "Phone",
    optional: "optional",
    need: "Which work would you like to hand over to OpsQ?",
    needHint: "For example: handling email, following up on leads, scheduling meetings, talking to clients, managing recurring tasks…",
    submit: "Send request",
    sending: "Sending…",
    success: "Thank you. We'll get back to you to understand which work you could hand over to OpsQ.",
    error: "Something went wrong while sending. Please try again in a moment.",
    invalid: "Please fill in your name, business name and a valid email.",
    privacy: "Your details are only used to get back to you about the demo.",
    mailto: "An email window opened with your details. Just press send.",
    offline: "The form isn't connected in this preview version yet.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Straight answers",
    items: [
      {
        q: "What does OpsQ actually do today?",
        a: "It connects to your business's Gmail and Google Calendar. It searches, reads and summarizes email, drafts replies and sends them after approval, checks availability, and books and cancels meetings after approval. It also remembers details about the business and manages contacts. All of this works against your real accounts, powered by Claude from Anthropic.",
      },
      {
        q: "What is still in development?",
        a: "WhatsApp and phone calls are in development. Working on websites, shopping, recurring tasks and full autonomy come later. Every capability on this page is labeled with its real status.",
      },
      {
        q: "Can it act without approval?",
        a: "Not by default. Sending email and changing the calendar wait for approval. You can change this per action: allow it, require approval, or block it. A request that isn't approved simply doesn't run.",
      },
      {
        q: "How is data stored?",
        a: "Every business gets its own private environment. Access to Google is stored encrypted, is never shown again on any screen and never reaches the model. You can disconnect at any time.",
      },
      {
        q: "Can it see other customers' data?",
        a: "No. Each business's data is completely separated, and that separation is covered by tests that try to break it.",
      },
      {
        q: "How will WhatsApp work?",
        a: "It's in development and not available yet. The idea: you talk to the agent on WhatsApp like an employee, and it works with the same memory, connections and permissions as in the dashboard. Important actions will wait for approval there too.",
      },
      {
        q: "Will it have its own number?",
        a: "That's the direction: each agent gets its own WhatsApp number that you can save as a contact. It isn't available yet.",
      },
      {
        q: "Will it make phone calls?",
        a: "It's in development and not available yet. The idea is short calls to check and coordinate, where it introduces itself as a digital employee and sends you a summary afterwards.",
      },
      {
        q: "Will it take actions on websites?",
        a: "That comes later. The goal is to work with websites that have no proper integration, for example filling in forms or comparing prices, and to stop for approval before any payment.",
      },
      {
        q: "Can I set budget and permission limits?",
        a: "Per-action permissions are available today. Budget limits will arrive with the shopping and payment capabilities, which come later.",
      },
      {
        q: "Does it replace employees?",
        a: "It takes repetitive work off your plate: searching, summarizing, drafting and scheduling. Decisions stay with people.",
      },
    ],
  },
  footer: {
    tagline: "A private digital employee for your business. It does the work and leaves the decisions to you.",
    rights: "All rights reserved.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { he, en };
