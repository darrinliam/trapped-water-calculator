import React, { useState } from "react";
import './trap.css';
import waterTrapCalc from './waterTrapCalc.js';
import { Title, WaterCount, Instructions } from './trapTextComps';


const ActButton = (props) => {
  return (
    <button className="actButton" onClick={props.onClick}>{props.label}</button>
  )
}

/**
*  Grid container component - sets css row/col variables
*  @param {Object} props
*/
const GridContainer = (props) => {
  let cssProperties = {};
  cssProperties['--cols'] = props.cols;
  cssProperties['--rows'] = props.rows;
  return (
      <div className="gridContainer">
        <div className="trapGrid"  style={cssProperties}>
          {props.table}
        </div>
      </div>
  );
}

/**
*  Creates new grid and initializes all squares with same value
*
*  @params  {number} gridRows
*  @params  {number} gridCols
*  @params  {string} initValue
*  @returns {array[]}
*
*/
const initGrid = (gridRows, gridCols, initValue) => {
  let grid = [];
  let row = [];
    
  for (let r = 0 ; r < gridCols; r++) 
  {
    row.push(initValue);
  }
  for (let c = 0; c < gridRows; c++) 
  {
    grid.push([...row]);  
  }
  return grid;
}

/** 
*  Deep copy of grid.
*
*  @params  {array} srcGrid
*  @returns {array}
*
*/
const copyGrid = (srcGrid) => {
  let grid = [];
    
  for (let r = 0 ; r < srcGrid.length; r++)
  {
    grid.push([]);
    for (let c = 0; c < srcGrid[0].length; c++)
    {
      grid[r][c] = srcGrid[r][c];
    }
  }
  return grid;
}

const MAX_GRID_DIM = 30;

/** 
*  Functional component for the trapped water calculator. Uses hooks for state management.
*  Possible square markings:
*    'L' land
*    'W' water
*    '-' neither water nor land. Air.
*
*/
const Trap = (props) => {
  
  let gridCols = 10;  // default
  let gridRows = 10;  // default
  
  if (props.cols && props.cols > 0 && props.cols < MAX_GRID_DIM)
    gridCols = props.cols;
    
  if (props.rows && props.rows > 0 && props.rows < MAX_GRID_DIM)
    gridRows = props.rows;  
    
  //console.log("rows", gridRows);
  //console.log("cols", gridCols);
  
  let cellTable = [];
  
  const [cellVals , setCellVals] = useState(() => { return initGrid(gridRows, gridCols, '-');});
  const [waterCount, setWaterCount] = useState(0);

  const changeLandCells = (newCellVals, r, c) => 
  {
    if (newCellVals[r][c] !== 'L') // adding land?
    {
       // make land in all cells below clicked cell, including clicked cell, because there are
       // no underground aquifers.
       for (let hrow = r; hrow < gridRows; hrow++)
       {
        newCellVals[hrow][c] = 'L'; 
       }
    }
    else // removing land.
    {
      // remove land in all cells above cell, including clicked cell (no levitating land allowed, sorry).
      for (let hrow = r; hrow >= 0; hrow--)
      {
        newCellVals[hrow][c] = '-'; 
      
        // clear any water above the clicked cell
        for (let wcol = 0; wcol < gridCols; wcol ++)
        {
          if (newCellVals[hrow][wcol] === 'W')
          newCellVals[hrow][wcol] = '-';
        }
      }
    }
    return newCellVals;
  }
  
  // Toggle land on/off on target square
  const cellClick = (e) => {
    let newCellVals = copyGrid(cellVals);
    newCellVals = changeLandCells(newCellVals, e.target.dataset.row, e.target.dataset.col);
    let newWaterCount = waterTrapCalc(newCellVals);
    setWaterCount(newWaterCount); 
    setCellVals(newCellVals);
  }
  
  // Empty grid of all land
  const clearGrid = () => {
    let startGrid = initGrid(gridRows, gridCols, '-');
    setCellVals(startGrid);
    setWaterCount(0);
  }
  
  // update class for each grid square
  for (let r = 0; r < gridRows; r++)
  {
    let row = [];
    for (let c = 0; c < gridCols; c++)
    { 
      let cellClass = "gCell";
      if (cellVals.length === gridRows)
      {
        cellClass = (cellVals[r][c] === 'L') ? "gCellLand" :
                    (cellVals[r][c] === 'W') ? "gCellWater" : "gCell";
      }
    
      row.push(
        <div className={cellClass} key={c} id={r + '.' + c} onClick={cellClick} data-row={r} data-col={c}>
        </div>);
    }
    cellTable.push(row);
  }
  
  return (
    <>
      <div className="back"> 
        <Title text="Trapped Water Calculator"/>
        <Instructions text="Click a square to toggle land on/off."/>
        <GridContainer table={cellTable} rows={gridRows} cols={gridCols}/>
        <WaterCount text="Squares containing water" count={waterCount}/>
        <ActButton label="Clear Grid" onClick={clearGrid}></ActButton>
      </div>
    </>
  )
}

export default Trap;

