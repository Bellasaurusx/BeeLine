import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFS_KEY = "beeline:notifs:v1";
const UNREAD_KEY = "beeline:notifs:unread:v1";
const DAILY_KEY = "beeline:notifs:lastDailyDate:v1";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export async function getNotifications() {
  const raw = await AsyncStorage.getItem(NOTIFS_KEY);
  const list = raw ? JSON.parse(raw) : [];
  return Array.isArray(list) ? list : [];
}

export async function setNotifications(list) {
  await AsyncStorage.setItem(NOTIFS_KEY, JSON.stringify(list));
}

export async function setUnread(value) {
  await AsyncStorage.setItem(UNREAD_KEY, value ? "true" : "false");
}

export async function getUnread() {
  const v = await AsyncStorage.getItem(UNREAD_KEY);
  return v === "true";
}

export async function markAllRead() {
  await setUnread(false);
}

export async function addNotification({ title, body, type = "info" }) {
  const list = await getNotifications();

  const item = {
    id: `n_${Date.now()}`,
    title,
    body,
    type,
    createdAt: new Date().toISOString(),
  };

  const next = [item, ...list].slice(0, 100); 
  await setNotifications(next);
  await setUnread(true);
  return item;
}

export async function ensureDailyNotification() {
  const today = todayKey();
  const lastDaily = await AsyncStorage.getItem(DAILY_KEY);

  if (lastDaily === today) return;

  const dailyPool = [
  {
    title: "Daily tip",
    body: "Spend a few minutes noticing which plants attract the most activity. Patterns show up faster than you think."
  },
  {
    title: "Quick challenge",
    body: "Identify one plant near you today and add it to your map."
  },
  {
    title: "Small step, big impact",
    body: "Even a single pollinator-friendly plant can make a difference in your local ecosystem."
  },
  {
    title: "Did you know?",
    body: "Native plants are often the most valuable food sources for local pollinators."
  },
  {
    title: "Try this today",
    body: "Take a photo of a plant you pass every day and see what BeeLine identifies."
  },
  {
    title: "Observation tip",
    body: "Pollinators are most active during warmer parts of the day. Mid-morning is a great time to observe."
  },
  {
    title: "Build your collection",
    body: "Adding even one new plant a day quickly turns into a useful personal record."
  },
  {
    title: "Eco insight",
    body: "Plants with clustered flowers often attract more pollinators than single blooms."
  },
  {
    title: "Quick reminder",
    body: "Healthy pollinator habitats can exist in small spaces, including balconies and gardens."
  },
  {
    title: "Spot the details",
    body: "Leaf shape and flower color can be just as helpful as petals when identifying plants."
  },
  {
    title: "Daily check-in",
    body: "Have you noticed any changes in pollinator activity around you this week?"
  },
  {
    title: "Learning moment",
    body: "Not every flowering plant benefits pollinators equally. Identification helps tell the difference."
  },
  {
    title: "Keep exploring",
    body: "Your local environment is more diverse than it looks at first glance."
  },
  {
    title: "Field note",
    body: "Pollinators often return to the same plants repeatedly. Revisit spots you’ve pinned before."
  },
  {
    title: "Quick action",
    body: "Take a moment to identify a plant you’ve never looked up before."
  },
  {
    title: "Did you notice?",
    body: "Some plants attract different pollinators depending on the season."
  },
  {
    title: "Daily nudge",
    body: "Consistency matters more than volume. Small observations add up over time."
  },
  {
    title: "BeeLine tip",
    body: "Saving your finds helps build a clearer picture of local plant activity."
  }
];


  const pick = dailyPool[Math.floor(Math.random() * dailyPool.length)];
  await addNotification({ ...pick, type: "tip" });

  await AsyncStorage.setItem(DAILY_KEY, today);
}
