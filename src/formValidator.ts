import isEmail from 'validator/lib/isEmail';

export const setupValidatorForm = (): void => {
  const form = document.querySelector('form') as HTMLFormElement;
  const inputName = document.getElementById('inputName') as HTMLInputElement;
  const inputEmail = document.getElementById('inputEmail') as HTMLInputElement;
  const inputConfirmEmail = document.getElementById(
    'inputConfirmEmail',
  ) as HTMLInputElement;
  const inputPassword = document.getElementById(
    'inputPassword',
  ) as HTMLInputElement;
  const inputConfirmPassword = document.getElementById(
    'inputConfirmPassword',
  ) as HTMLInputElement;

  const validarInput = (
    input: HTMLInputElement,
    condicaoErro: boolean,
    mensagem: string,
  ): void => {
    const spanMsg = input.closest('.container-input')?.querySelector('span');
    if (!spanMsg)
      return console.warn('Span de mensagem não encontrado para:', input.id);

    if (condicaoErro) {
      spanMsg.textContent = mensagem;
      spanMsg.classList.add('msg', 'text-red-500');
    } else {
      spanMsg.textContent = '';
      spanMsg.classList.remove('msg', 'text-red-500');
    }
  };

  // Validação em tempo real
  inputName.addEventListener('input', () =>
    validarInput(
      inputName,
      inputName.value.trim() === '',
      'Por favor, insira seu nome.',
    ),
  );

  inputEmail.addEventListener('input', () =>
    validarInput(
      inputEmail,
      !isEmail(inputEmail.value),
      'Por favor, insira um email válido.',
    ),
  );

  inputConfirmEmail.addEventListener('input', () =>
    validarInput(
      inputConfirmEmail,
      inputConfirmEmail.value !== inputEmail.value,
      'Os emails não coincidem.',
    ),
  );

  inputPassword.addEventListener('input', () =>
    validarInput(
      inputPassword,
      inputPassword.value.trim().length < 8,
      'A senha deve ter no mínimo 8 caracteres.',
    ),
  );

  inputConfirmPassword.addEventListener('input', () =>
    validarInput(
      inputConfirmPassword,
      inputConfirmPassword.value !== inputPassword.value,
      'As senhas não coincidem.',
    ),
  );

  // Validação no submit
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    validarInput(
      inputName,
      inputName.value.trim() === '',
      'Por favor, insira seu nome.',
    );
    validarInput(
      inputEmail,
      !isEmail(inputEmail.value),
      'Por favor, insira um email válido.',
    );
    validarInput(
      inputConfirmEmail,
      inputConfirmEmail.value !== inputEmail.value,
      'Os emails não coincidem.',
    );
    validarInput(
      inputPassword,
      inputPassword.value.trim().length < 8,
      'A senha deve ter no mínimo 8 caracteres.',
    );
    validarInput(
      inputConfirmPassword,
      inputConfirmPassword.value !== inputPassword.value,
      'As senhas não coincidem.',
    );

    // Verificação final
    const formValido = !document.querySelectorAll('.msg:not(:empty)').length;

    if (formValido) {
      alert('Formulário enviado com sucesso!');
      form.reset(); // opcional: limpa os campos após envio
    }
  });
};
