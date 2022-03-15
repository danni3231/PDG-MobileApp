import * as React from "react";

interface ScheduleOptionProps {
  start: number;
  end: number;
  index: number;
  selected?: boolean;
  update(index: number): void;
}

const ScheduleOption: React.FC<ScheduleOptionProps> = ({
  start,
  end,
  update,
  index,
  selected,
}) => {
  const handleOptionClick = () => {
    update(index);
  };
  return (
    <div
      className={
        selected
          ? "spaceView__schedule__option spaceView__schedule__option--selected"
          : "spaceView__schedule__option"
      }
      onClick={handleOptionClick}
    >
      {`${start}:00 - ${end}:00`}
    </div>
  );
};

export default ScheduleOption;
