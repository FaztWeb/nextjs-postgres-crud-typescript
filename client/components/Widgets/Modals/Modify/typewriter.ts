import { TypewriterClass } from 'typewriter-effect';

export const write = (typewriter: TypewriterClass) => {
  typewriter
    .typeString('Sugerati o modificare . . .')
    .pauseFor(400)
    .deleteChars(16)
    .typeString('schimbare . . . ')
    .start();
};
