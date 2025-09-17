# 24-hour Sun Clock

This project shows a 24-hour sundial with azimuthal projection, the day band, and the Sun's real-time path.

## How to calculate solar time

The clock's base time is UTC+0. To calculate solar time in other time zones:

- **By longitude:** Add or subtract hours based on geographic longitude. Every 15° of longitude is equivalent to 1 hour of difference from UTC.
- **By local time zone:** Add or subtract your country's time difference from UTC.
For example, if you are in Madrid (UTC+1), add 1 hour to UTC.

## Table of UTC and major cities/countries

| UTC Offset | City/Location | Country        |
| ---------- | ------------- | -------------- |
| UTC-8      | Los Angeles   | United States  |
| UTC-5      | New York      | United States  |
| UTC-3      | Buenos Aires  | Argentina      |
| UTC-3      | Sao Paulo     | Brazil         |
| UTC+0      | London        | United Kingdom |
| UTC+1      | Madrid        | Spain          |
| UTC+1      | Paris         | France         |
| UTC+2      | Athens        | Greece         |
| UTC+2      | Cairo         | Egypt          |
| UTC+3      | Moscow        | Russia         |
| UTC+3      | Nairobi       | Kenya          |
| UTC+5:30   | New Delhi     | India          |
| UTC+8      | Beijing       | China          |
| UTC+9      | Tokyo         | Japan          |
| UTC+10     | Sydney        | Australia      |

## Calculation Example

If UTC is 12:00 and you are in Tokyo (UTC+9):

```txt
Local time = 12:00 + 9 hours = 21:00
```

## Installation and Use

1. Install dependencies:

	```bash
	npm install
	```

2. Run the project:

	```bash
	npm run dev
	```

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			// Other configs...
			// Remove tseslint.configs.recommended and replace with this
			...tseslint.configs.recommendedTypeChecked,
			// Alternatively, use this for stricter rules
			...tseslint.configs.strictTypeChecked,
			// Optionally, add this for stylistic rules
			...tseslint.configs.stylisticTypeChecked,
			// Other configs...
		],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			// Other configs...
			// Enable lint rules for React
			reactX.configs['recommended-typescript'],
			// Enable lint rules for React DOM
			reactDom.configs.recommended,
		],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
])
```
