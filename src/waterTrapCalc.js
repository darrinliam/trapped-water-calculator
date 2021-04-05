// watertrap.js - logic for calculating trapped water and marking water cells


/**
* Make height array
* NOTE: There are no underground aquifers or pockets of water under land overhangs.
*   @param {array[]}
*   @returns {array}

*/
const makeLandHeightArray = (newCellVals) => {
	  let gridRows = newCellVals.length;
	  let gridCols = newCellVals[0].length;
	  let heightArr = [];
	  for (let col = 0; col < gridCols; col++)
	  {
		  let highestLand = 0;
		  for (let row = 0; row < gridRows; row++)
		  {
			if (newCellVals[row][col] === 'L')
			{
               highestLand = gridRows - row;
			   break;
			}				
		  }
		  heightArr.push(highestLand);
	  }  
	  return heightArr;
}


/**
*  waterTrapCalc - caluclates which squares should be water, based on the max height of
*  land in each column.

*  Water squares are changed to 'W'.
* 
*  cellVals may also get modified.
*
*   @param {array[]}
*   @returns {number}
*/
const waterTrapCalc = function(cellVals) {
  let water = 0;
  let heightarr = makeLandHeightArray(cellVals);
  let len = heightarr.length;
	
  for (let h = 0; ; h++ )
  {
	  let lastLand = -1;
      for (let i = 0; i < len; i++)
      {
          if (heightarr[i] > 0)
          {
              if ((lastLand > -1) && (lastLand !== i - 1))
			  {
                  water += i - lastLand - 1;
				  
				  // fill in water in applicable cells
				  for (let waterInd = lastLand + 1; waterInd < lastLand + i - lastLand; waterInd++)
				  {
					cellVals[heightarr.length - h - 1][waterInd] = 'W';  // assumes square grid
				  }
			  }
              lastLand = i;
          }
      }
      
	  // move to next higher row
      heightarr = heightarr.map( (item) => (item > 0) ? --item : item);
      if (!(heightarr.some( (item) =>  item > 0 )))
          break;  // reached the top
  }
  return water;
};

export default waterTrapCalc;
