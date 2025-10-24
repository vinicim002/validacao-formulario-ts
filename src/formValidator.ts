// import isEmail from 'validator/lib/isEmail';
export const setupValidatorForm = (): void => {
  const form = document.querySelector('form') as HTMLFormElement;
  const inputUser = document.querySelector('#inputName') as HTMLInputElement;

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    
    checarCampoUser(inputUser);
  });

  //Checar se o usuario foi digitado
  const checarCampoUser = (input: HTMLInputElement): void => {
    if(!input.value) {
      mostrarMsg(input, "Digite um nome válido.");
    }
  }

  //Funcao para mostrar mensagem
  const mostrarMsg = (input: HTMLInputElement, msg: string): void {
    
  }
};
