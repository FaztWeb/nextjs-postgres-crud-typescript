import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import ModalTemplate from '../Modals';
import info__style from './info.module.css';
import Button from '../../Button/Button';
import Dispatch from '../../Button/Dispatch/Dispatch';
import { action, indexOf } from 'store';
const Info = () => {
  const { visible } = useAppSelector(({ infoModal }) => infoModal);
  const zIndex = indexOf('info-modal');
  const dispatch = useAppDispatch();
  const closeInfo = () => {
    dispatch(
      action('info-modal/close', {
        zIndex: 0,
      })
    );
  };
  const openModifyModal = () => {
    dispatch(
      action('modify-modal/open', {
        zIndex: zIndex + 1,
      })
    );
  };
  return visible ? (
    <ModalTemplate
      zIndex={zIndex}
      closeCurrentModal={closeInfo}
      header={{
        title: 'Biserica Catolica din Elisabetin',
        subtitle: 'Aflati mai multe informatii despre biserica Catolica',
      }}
    >
      <div className={info__style.container}>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          esse. Ab dolorem nam recusandae quaerat tempore sapiente rerum.
          Quaerat, rerum perspiciatis aut dicta distinctio quis dolore sunt
          eligendi possimus impedit. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Et, ut enim neque animi veniam alias iste vero
          maxime, excepturi aspernatur esse sunt blanditiis at ad ea, quidem
          numquam porro praesentium. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Porro illum ducimus odit iure ex cumque, nulla dicta
          quo beatae deleniti eligendi, quia doloremque esse! Vel voluptatibus
          dolores laborum eius reiciendis! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Illo quis perspiciatis dolorum quae,
          eius officiis deserunt molestias esse repellendus! Necessitatibus ut
          saepe incidunt. Ea reiciendis ex, eaque tempora doloribus quam. Lorem,
          ipsum dolor sit amet consectetur adipisicing elit. Officiis, esse. Ab
          dolorem nam recusandae quaerat tempore sapiente rerum. Quaerat, rerum
          perspiciatis aut dicta distinctio quis dolore sunt eligendi possimus
          impedit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et,
          ut enim neque animi veniam alias iste vero maxime, excepturi
          aspernatur esse sunt blanditiis at ad ea, quidem numquam porro
          praesentium. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Porro illum ducimus odit iure ex cumque, nulla dicta quo beatae
          deleniti eligendi, quia doloremque esse! Vel voluptatibus dolores
          laborum eius reiciendis! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Illo quis perspiciatis dolorum quae, eius officiis
          deserunt molestias esse repellendus! Necessitatibus ut saepe incidunt.
          Ea reiciendis ex, eaque tempora doloribus quam. Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Officiis, esse. Ab dolorem nam
          recusandae quaerat tempore sapiente rerum. Quaerat, rerum perspiciatis
          aut dicta distinctio quis dolore sunt eligendi possimus impedit.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et, ut enim
          neque animi veniam alias iste vero maxime, excepturi aspernatur esse
          sunt blanditiis at ad ea, quidem numquam porro praesentium. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Porro illum
          ducimus odit iure ex cumque, nulla dicta quo beatae deleniti eligendi,
          quia doloremque esse! Vel voluptatibus dolores laborum eius
          reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Illo quis perspiciatis dolorum quae, eius officiis deserunt molestias
          esse repellendus! Necessitatibus ut saepe incidunt. Ea reiciendis ex,
          eaque tempora doloribus quam.
        </p>
        <div className={info__style.button__wrapper}>
          <Dispatch action={openModifyModal} payload="Sugerati o schimbare" />
        </div>
      </div>
    </ModalTemplate>
  ) : null;
};

export const ID = 'info-modal';
export default Info;
