/* ==========================================================================
   Modo secreto — PONTO DE ENTRADA RESERVADO PARA A FUNCIONALIDADE FUTURA.

   activateSecretMode() é chamada UMA vez, e somente, quando o código correto
   é aceito. Hoje ela apenas registra o estado; nenhuma mudança visual é feita
   aqui. A expansão futura (alterações de CSS na página inteira, personagem,
   hitboxes sobre as camadas .media__layer[data-layer="interaction"], etc.)
   deve entrar por UM destes dois caminhos, sem tocar na sequência, no código
   ou na estrutura das imagens:

     1) editar o corpo de activateSecretMode() / deactivateSecretMode();
     2) escutar o evento "egg:secret-activated" (e "egg:secret-deactivated")
        a partir de qualquer módulo novo.

   O estado também fica visível ao CSS em <html data-secret-mode="on">.
   ========================================================================== */
import { EVENTS } from "./config.js";

/**
 * @param {{root: HTMLElement, emit: (name: string, detail?: object) => void}} context
 *   root = elemento .egg que originou a ativação; emit = emissor de eventos do egg.
 */
export function activateSecretMode({ root, emit }) {
  document.documentElement.dataset.secretMode = "on";
  emit(EVENTS.SECRET_ON, { root });
}

/** Chamada se a interação for desativada (ex.: tela reduzida abaixo de 1024px). */
export function deactivateSecretMode({ root, emit }) {
  delete document.documentElement.dataset.secretMode;
  emit(EVENTS.SECRET_OFF, { root });
}
