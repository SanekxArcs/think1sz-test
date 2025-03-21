# Workout Application Form

Responsywna aplikacja do ćwiczeń zbudowana z wykorzystaniem React, TypeScript i Tailwind CSS, która umożliwia użytkownikom rezerwację sesji treningowych poprzez podanie danych osobowych, wybranie dat i określenie przedziałów czasowych.

## Stack

- React
- TypeScript
- Tailwind CSS
- Next.js

## Opis zadania (Task Description in Polish)

### Co zostało zrobione w tym zadaniu

W ramach tego zadania stworzyłem formularz aplikacyjny do rezerwacji treningów, zgodnie z podanymi wymaganiami:

1. **Komponenty formularza**:
   - Zaimplementowałem wszystkie wymagane pola formularza (imię, nazwisko, email, wiek, zdjęcie, data, godzina)
   - Stworzyłem własny system walidacji formularza bez użycia zewnętrznych bibliotek
   - Dodałem obsługę błędów i komunikaty walidacyjne dla każdego pola

2. **Integracja z API świąt**:
   - Zintegrowano API Ninja Holidays (https://api-ninjas.com/api/holidays) do pobierania świąt w Polsce
   - Zaimplementowano blokowanie dat treningów w niedziele oraz dni z typem "NATIONAL_HOLIDAY"
   - Dodano wyświetlanie informacji o święcie przy wyborze daty z typem "OBSERVANCE"

3. **Komponenty interfejsu**:
   - Stworzono interaktywny kalendarz z pełną obsługą klawiatury (strzałki, PageUp/PageDown, Home, End)
   - Zaimplementowano suwak do wyboru wieku z dynamicznym tooltip'em
   - Dodano komponent wgrywania zdjęć z obsługą drag-and-drop

4. **Hooki i zarządzanie stanem**:
   - Stworzono własne hooki (useDragAndDrop, useRangeSlider) do zarządzania złożonymi interakcjami
   - Zaimplementowano kompletny system zarządzania stanem formularza

5. **Dostępność**:
   - Dodano pełne wsparcie ARIA dla komponentów
   - Zaimplementowano nawigację klawiaturą
   - Uwzględniono czytniki ekranowe poprzez odpowiednie atrybuty

6. **Organizacja kodu**:
   - Wyodrębniono typy i interfejsy do oddzielnych plików
   - Zorganizowano komponenty w mniejsze, wielokrotnego użytku
   - Zaimplementowano API Route do obsługi zapytań o święta

7. **Obsługa wysyłania formularza**:
   - Zaimplementowano wysyłanie danych formularza jako FormData
   - Dodano obsługę stanów ładowania i sukcesu
   - Zrealizowano pełną walidację formularza przed wysyłką

Projekt został stworzony z dużym naciskiem na szczegóły interfejsu, responsywność oraz dostępność. Wszystkie komponenty zostały stworzone od podstaw, bez użycia zewnętrznych bibliotek do formularzy.

## Features

- Form with field validation
- Age selection via range slider with custom tooltip
- File upload with drag-and-drop support
- Interactive calendar with holiday integration
- Time slot selection
- Keyboard navigation support
- Responsive design
- Form submission handling

## Co jeszcze mógłbym dodać?

### Ulepszenia UI/UX
- Dodanie animacji w całej aplikacji dla lepszej informacji zwrotnej dla użytkownika
- Dodanie przycisku powrotu na górze dla łatwiejszej nawigacji, aby zaimplementować doświadczenie podobne do aplikacji mobilnej w widoku mobilnym
- Zapewnienie, że błędy nie zmieniają układu dla płynniejszego doświadczenia użytkownika
- Dodanie strony sukcesu/powiadomienia toast po przesłaniu formularza
- Implementacja funkcji przekierowania do strony głównej po przesłaniu

### Ulepszenia przesyłania zdjęć
- Wyświetlanie obsługiwanych typów plików (PNG, JPG, WEBP) jako wskazówek dla użytkowników
- Dodanie jasnych limitów rozmiaru plików (maksymalnie 5MB) dla określenia oczekiwań
- Rozszerzenie funkcji podglądu wybranych obrazów jako okno dialogowe lub w inny sposób

### Wybór przedziałów czasowych
- Utrzymanie wszystkich przedziałów czasowych widocznymi, ale wyłączonymi, aby pomóc użytkownikom zrozumieć dostępność
- Poprawa wizualnego wskazania dostępnych i niedostępnych przedziałów

### Ulepszenia kalendarza
- Implementacja różnych kolorów dla różnych typów świąt dla lepszego wizualnego rozróżnienia

### Kontrolki formularza
- Przeprojektowanie selektora wieku jako pole wprowadzania z niestandardowymi przyciskami zwiększania/zmniejszania
- Implementacja React Query dla wydajnego pobierania danych
- Dodanie Redux dla scentralizowanego zarządzania stanem

## Project Structure

```
think1sz-test-task/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── holidays/
│   │   │   │   └── route.ts
│   │   │   └── submit/
│   │   │       └── route.ts
│   │   └── page.tsx
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Calendar.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── FileInput.tsx
│   │   ├── Input.tsx
│   │   ├── RangeSlider.tsx
│   │   ├── RequiredLabel.tsx
│   │   ├── SectionHeader.tsx
│   │   └── TimeSlots.tsx
│   ├── hooks/
│   │   ├── useDragAndDrop.ts
│   │   └── useRangeSlider.ts
│   └── types/
│       ├── components.ts
│       ├── forms.ts
│       └── hooks.ts
└── ...
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your API key:
   ```
   API_KEY="OH+HEf/9IH2zuHR/cMO/8g==ldhBovC6Rpa1TIss"
   ```
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the application
