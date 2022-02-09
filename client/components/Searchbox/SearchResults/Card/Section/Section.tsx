import ClickOverlay from 'components/ClickOverlay/ClickOverlay';
import { FC } from 'react';

import section_style from './section.module.css';
interface CreateSection {
  isNavigable: boolean;
  mainContent: {
    element: JSX.Element;
    position: 'first' | 'last' | 'middle';
    iconAlign: 'top' | 'center';
    sideEffects: (() => void) | undefined;
  };
  iconContent: {
    element: JSX.Element;
    size: 'x-tiny' | 'tiny' | 'small' | 'medium' | 'large' | 'x-large';
  };
}

const Section: FC<CreateSection> = ({
  iconContent,
  isNavigable,
  mainContent,
}) => {
  const iconContainer = (
    <div
      className={`${section_style.icon__container} ${
        section_style[iconContent.size]
      }`}
    >
      {iconContent.element}
    </div>
  );

  const contentContainer = (
    <div className={`${section_style.main__content}`}>
      {mainContent.element}
    </div>
  );

  return isNavigable ? (
    <ClickOverlay>
      <div
        className={`${section_style.content__container} ${
          section_style[mainContent.position]
        }`}
      >
        {iconContainer}
        {contentContainer}
      </div>
    </ClickOverlay>
  ) : (
    <div
      className={`${section_style.content__container} ${
        section_style[mainContent.position]
      }`}
    >
      {iconContainer}
      {contentContainer}
    </div>
  );
};

export default Section;
