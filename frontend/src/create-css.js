import fs from 'fs';

// Create App.css
fs.writeFileSync('App.css', '/* App Styles - Tailwind CSS handles most styling */\n', 'utf8');

// Create index.css
const indexCss = `@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  --sigap-blue: #1e3a8a;
}

.glass-card {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-nav {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.text-shadow-sm {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-size: 24px;
  display: inline-block;
}
`;

fs.writeFileSync('index.css', indexCss, 'utf8');

console.log('✅ CSS files created successfully!');

