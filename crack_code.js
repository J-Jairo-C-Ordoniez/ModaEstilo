import bcrypt from 'bcryptjs';

const hashedCode = '$2b$10$NPHLWi0ZrG/3Awqj3MQW0.JULlNozS0dmDdB0iJu1LAhmv/CcaeJO';

async function crack() {
  console.log('Cracking...');
  for (let i = 100000; i <= 999999; i++) {
    const code = i.toString();
    if (await bcrypt.compare(code, hashedCode)) {
      console.log('FOUND:', code);
      return;
    }
    if (i % 10000 === 0) console.log('Checked up to:', i);
  }
  console.log('Not found');
}

crack();
