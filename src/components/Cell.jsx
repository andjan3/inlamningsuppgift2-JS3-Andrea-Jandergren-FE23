const Cell = ({ cell, onCellClick, gameStatus }) => {
  function handleClick() {
    if (gameStatus === "In progress") {
      onCellClick(cell.index);
    }
  }

  const renderCellContent = () => {
    if (cell.hasMine) {
      return <div>&#128163;</div>;
    }

    if (cell.numberOfNeighbouringMines > 0) {
      return cell.numberOfNeighbouringMines;
    } else return null;
  };

  return (
    <div className="cell" onClick={handleClick}>
      {cell.visible ? renderCellContent() : "?"}
    </div>
  );
};

export default Cell;
