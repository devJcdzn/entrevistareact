import { useState } from 'react';
import './App.css';

function App() {
  const [clickedPoints, setClickedPoints] = useState([]);
  const [redoPoints, setRedoPoints] = useState([]);

  function getCordinates(e) {
    const { clientX, clientY } = e;

    setClickedPoints([...clickedPoints, { clientX, clientY }]);
  }

  function handleUndo() {
    const newClickedPoints = [...clickedPoints];
    const undoPoint = newClickedPoints.pop();
    setClickedPoints(newClickedPoints);
    setRedoPoints([...redoPoints, undoPoint]);
  }

  function handleRedo() {
    const newUndoPoints = [...redoPoints];
    const redoPoint = newUndoPoints.pop();
    setRedoPoints(newUndoPoints);
    setClickedPoints([...clickedPoints, redoPoint]);
  }

  function handleReset() {
    setClickedPoints([]);
    setRedoPoints([]);
  }

  return (
    <>
      <div className="header">
        <button disabled={clickedPoints.length === 0} onClick={handleUndo}>Undo</button>
        <button disabled={clickedPoints.length === 0 || redoPoints === 0} onClick={handleReset}>Reset</button>
        <button disabled={redoPoints.length === 0} onClick={handleRedo}>Redo</button>
      </div>
      <div className="App" onClick={getCordinates}>
        {clickedPoints.map((clickedPoint, index) => {
          return (
            <div key={index}
              style={{
                position: 'absolute',
                left: clickedPoint.clientX - 5,
                top: clickedPoint.clientY - 6,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#fff',
              }}
            >

            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
