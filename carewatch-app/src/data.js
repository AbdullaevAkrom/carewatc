// Mock data — five families, each with their own relative, devices and events.
// Replace this file with real API calls once the backend is wired in.
export const relatives = [
  {
    id: "fam-1", family: "Юсуповы", name: "Мухаббат Юсупова", age: 68, city: "Ташкент",
    address: "г. Ташкент, Юнусабадский р-н", lastSeen: "5 минут назад", status: "normal",
    avatar: "https://i.ytimg.com/vi/fS4GyOm95Ho/maxresdefault.jpg",
    activityPulse: [2, 6, 9, 5, 3, 7, 8, 4, 2, 6, 7, 9, 5, 3, 2].map((v, i) => ({ t: `${6 + i}:00`, v })),
    devices: [
      { id: 1, name: "Датчик движения — кухня", online: true, battery: 82 },
      { id: 2, name: "Датчик движения — коридор", online: true, battery: 64 },
      { id: 3, name: "Кнопка SOS", online: true, battery: 91 },
      { id: 4, name: "Датчик входной двери", online: false, battery: 12 },
    ],
    events: [
      { time: "09:12", text: "Движение зафиксировано на кухне" },
      { time: "08:40", text: "Входная дверь открыта, затем закрыта" },
      { time: "07:55", text: "Начало утренней активности" },
      { time: "вчера, 22:10", text: "Дом переведён в режим сна" },
    ],
  },
  {
    id: "fam-2", family: "Каримовы", name: "Абдулла Каримов", age: 74, city: "Самарканд",
    address: "г. Самарканд, центр", lastSeen: "40 минут назад", status: "warning", avatar: null,
    activityPulse: [1, 2, 3, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0].map((v, i) => ({ t: `${6 + i}:00`, v })),
    devices: [
      { id: 1, name: "Датчик движения — гостиная", online: true, battery: 55 },
      { id: 2, name: "Кнопка SOS", online: true, battery: 40 },
      { id: 3, name: "Датчик входной двери", online: true, battery: 21 },
    ],
    events: [
      { time: "07:20", text: "Нет активности больше 6 часов" },
      { time: "01:05", text: "Дверь не открывалась с вечера" },
      { time: "вчера, 20:30", text: "Последнее движение зафиксировано" },
    ],
  },
  {
    id: "fam-3", family: "Рашидовы", name: "Зулфия Рашидова", age: 71, city: "Фергана",
    address: "г. Фергана, ул. Мустакиллик", lastSeen: "12 минут назад", status: "normal", avatar: null,
    activityPulse: [3, 5, 7, 6, 4, 6, 7, 5, 3, 5, 6, 8, 6, 4, 3].map((v, i) => ({ t: `${6 + i}:00`, v })),
    devices: [
      { id: 1, name: "Датчик движения — кухня", online: true, battery: 71 },
      { id: 2, name: "Датчик движения — спальня", online: true, battery: 66 },
      { id: 3, name: "Кнопка SOS", online: true, battery: 88 },
      { id: 4, name: "Датчик входной двери", online: true, battery: 45 },
      { id: 5, name: "Датчик окна", online: true, battery: 58 },
    ],
    events: [
      { time: "10:02", text: "Движение зафиксировано в спальне" },
      { time: "08:15", text: "Утренняя активность началась вовремя" },
      { time: "вчера, 21:40", text: "Дом переведён в режим сна" },
    ],
  },
  {
    id: "fam-4", family: "Тошевы", name: "Норбой Тошев", age: 80, city: "Бухара",
    address: "г. Бухара, старый город", lastSeen: "только что", status: "sos", avatar: null,
    activityPulse: [2, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => ({ t: `${6 + i}:00`, v })),
    devices: [
      { id: 1, name: "Датчик движения — коридор", online: true, battery: 34 },
      { id: 2, name: "Кнопка SOS", online: false, battery: 4 },
    ],
    events: [
      { time: "09:03", text: "Нажата кнопка SOS" },
      { time: "08:58", text: "Резкое падение активности" },
      { time: "08:10", text: "Последнее обычное движение" },
    ],
  },
  {
    id: "fam-5", family: "Ахмедовы", name: "Саида Ахмедова", age: 66, city: "Наманган",
    address: "г. Наманган, центр", lastSeen: "20 минут назад", status: "normal", avatar: null,
    activityPulse: [2, 5, 8, 6, 4, 6, 7, 5, 3, 6, 7, 8, 5, 4, 2].map((v, i) => ({ t: `${6 + i}:00`, v })),
    devices: [
      { id: 1, name: "Датчик движения — кухня", online: true, battery: 77 },
      { id: 2, name: "Датчик движения — коридор", online: true, battery: 69 },
      { id: 3, name: "Кнопка SOS", online: true, battery: 95 },
      { id: 4, name: "Датчик входной двери", online: true, battery: 60 },
    ],
    events: [
      { time: "08:44", text: "Низкий заряд датчика двери" },
      { time: "08:00", text: "Утренняя активность зафиксирована" },
      { time: "вчера, 22:00", text: "Дом переведён в режим сна" },
    ],
  },
];

export const allUsers = relatives.map((r, i) => ({
  id: i + 1, family: r.family, relative: `${r.name}, ${r.age}`, city: r.city,
  devices: r.devices.length, status: r.status, familyId: r.id,
}));

export const deviceFleet = relatives.flatMap(r =>
  r.devices.map(d => ({ id: `D-${r.id}-${d.id}`, type: d.name.split(" — ")[0], family: r.family, online: d.online, battery: d.battery }))
);

export const initialAlerts = [
  { id: 1, family: "Тошевы", type: "SOS-сигнал", time: "сегодня, 09:03", resolved: false },
  { id: 2, family: "Каримовы", type: "Нет активности 6 часов", time: "сегодня, 07:20", resolved: false },
  { id: 3, family: "Ахмедовы", type: "Низкий заряд датчика", time: "вчера, 18:44", resolved: true },
  { id: 4, family: "Юсуповы", type: "Дверь открыта ночью", time: "вчера, 02:15", resolved: true },
];

// Mock accounts — real login now checks email + password against this list
// instead of letting the person freely pick a role/family. In a real app
// this table lives in the backend; here it's kept in memory so sign-up can
// push new accounts onto it for the current session.
export const accounts = [
  { email: "admin@carewatch.uz", password: "admin123", role: "admin", familyId: null, name: "Администратор" },
  { email: "dilnoza@carewatch.uz", password: "password123", role: "user", familyId: "fam-1", name: "Дилноза Юсупова" },
  { email: "sherzod@carewatch.uz", password: "password123", role: "user", familyId: "fam-2", name: "Шерзод Каримов" },
  { email: "gulnora@carewatch.uz", password: "password123", role: "user", familyId: "fam-3", name: "Гулнора Рашидова" },
  { email: "jasur@carewatch.uz", password: "password123", role: "user", familyId: "fam-4", name: "Жасур Тошев" },
  { email: "malika@carewatch.uz", password: "password123", role: "user", familyId: "fam-5", name: "Малика Ахмедова" },
];

