import visit__styles from './visit.module.css';

const options = [
  'Catedrala Mitropolitana Ortodoxa',
  'Muzeul Satului',
  'Opera Nationala',
];
const Visit = () => {
  return (
    <div className={visit__styles.container}>
      <div className={visit__styles.suggestion}> VEZI SI </div>
      <div className={visit__styles.options}>
        {options.map((option) => (
          <div key={option} className={visit__styles.option}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visit;
