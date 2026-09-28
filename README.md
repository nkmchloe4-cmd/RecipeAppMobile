# Recipe App Mobile

En mobilapp byggd med React Native och Expo för att bläddra bland recept. Hämtar data från samma backend (RecipeApi) som webbappen.

## Teknik
- React Native
- Expo
- React Navigation

## Förutsättningar

- Node.js installerat
- Expo Go-appen installerad på din mobiltelefon (finns i App Store / Google Play)
- Telefonen och datorn måste vara anslutna till **samma Wi-Fi-nätverk**

**VIKTIGT:** Backend-repot (`RecipeApi`) måste klonas och köras samtidigt annars kan inte recepten hämtas. Se det repots README för instruktioner. Starta backend FÖRE mobilappen.

## Starta mobilappen

1. Klona detta repo:

```bash
git clone https://github.com/nkmchloe4-cmd/RecipeAppMobile.git
```

2. Navigera till repots rotmapp:

```bash
cd RecipeAppMobile
```

3. Installera beroenden:

```bash
npm install
```

4. Starta Expo:

```bash
npx expo start
```

5. En QR-kod visas i terminalen. Öppna Expo Go-appen på din telefon och skanna koden.
Appen hämtar automatiskt din dators IP-adress för att ansluta till backend.

## Struktur

* `screens/` – appens skärmar (RecipeListScreen, RecipeDetailScreen)
* `services/` – logik för API-anrop och bildhantering
* `App.js` – huvudkomponenten som hanterar navigation mellan skärmar

## Funktioner

- Lista alla recept med bild, namn, beskrivning och tillagningstid
- Klicka på ett recept för att se fullständiga detaljer (ingredienser och steg)
- Lägga till nytt recept
- Redigera befintligt recept via förifyllt formulär
- Tydligt felmeddelande om recepten inte kan hämtas (t.ex. om backend inte körs)
- Gränssnitt anpassat för mobil skärmstorlek och touch-interaktion


## Tekniska val

- **Automatisk IP-igenkänning** används istället för en hårdkodad IP-adress så att appen fungerar för vem som helst som klonar repot oavsett deras nätverksadress.
- **Timeout på API-anrop** lades till för att undvika att appen fastnar i oändlig laddning om backend inte svarar.

## Status

Klart: navigation mellan lista, detaljvy och formulär. Recept hämtas, skapas och uppdateras mot eget API. Bilder visas korrekt (endast läsning, ingen bilduppladdning från mobilappen).