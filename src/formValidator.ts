// import isEmail from 'validator/lib/isEmail';
export const setupValidatorForm = (): void => {
  const form = document.querySelector('form') as HTMLFormElement;
  const inputUser = document.querySelector('#inputName') as HTMLInputElement;

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    checarCampoUser(inputUser);
  });

  // Checar se o usuário foi digitado
  const checarCampoUser = (input: HTMLInputElement): void => {
    if (!input.value.trim()) {
      mostrarMsg(input, 'Digite um nome válido.');
    } else {
      mostrarMsg(input, ''); // limpa a msg se estiver tudo certo
    }
  };

  // Função para mostrar mensagem
  const mostrarMsg = (input: HTMLInputElement, msg: string): void => {
    const msgSpan = input.closest('.container-input')?.querySelector('span') as HTMLSpanElement | null;

    if (msgSpan) {
      msgSpan.textContent = msg;

      if (msg) {
        msgSpan.classList.add('msg', 'text-red-500');
      } else {
        msgSpan.classList.remove('msg', 'text-red-500');
      }
    }
  };
};
