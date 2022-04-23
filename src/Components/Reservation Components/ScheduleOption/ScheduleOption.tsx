import * as React from "react";

interface ScheduleOptionProps {
  start: number;
  end: number;
  index: number;
  selected?: boolean;
  disabled?: boolean;
  update(index: number): void;
}

const ScheduleOption: React.FC<ScheduleOptionProps> = ({
  start,
  end,
  update,
  index,
  selected,
  disabled,
}) => {
  const handleOptionClick = () => {
    update(index);
  };

  if (selected) {
    return (
      <div
        className="spaceView__schedule__option spaceView__schedule__option--selected"
        onClick={handleOptionClick}
      >
        {`${start}:00 - ${end}:00`}
      </div>
    );
  } else if (disabled) {
    return (
      <div className="spaceView__schedule__option spaceView__schedule__option--disabled">
        {`${start}:00 - ${end}:00`}
      </div>
    );
  } else {
    return (
      <div className="spaceView__schedule__option" onClick={handleOptionClick}>
        {`${start}:00 - ${end}:00`}
      </div>
    );
  }
};

export default ScheduleOption;
