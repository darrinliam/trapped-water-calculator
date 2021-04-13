
import React from 'react';
import { render , screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
 
import Trap from './trap';
 
describe('Trap 1', () => {
  test('Renders trap component (default size: 10 x 10)', () => {
	render(<Trap />);
	
	expect(screen.getByText('Trapped Water Calculator')).toBeInTheDocument();
	expect(screen.getByText('Squares containing water: 0')).toBeInTheDocument();
	expect(screen.getByText('Clear Grid')).toBeInTheDocument();
	expect(screen.getByRole('button')).toBeInTheDocument();
	expect(document.getElementById("9.9")).toBeInTheDocument();
	expect(document.getElementById("10.9")).toBeNull();
	expect(document.getElementById("9.10")).toBeNull();

	expect(document.getElementById("9.3").className).toBe('gCell');
	fireEvent.click(document.getElementById("9.3"));
	expect(document.getElementById("9.3").className).toBe('gCellLand');
	
	fireEvent.click(document.getElementById("9.3"));  // toggle 
	expect(document.getElementById("9.3").className).toBe('gCell');  

	fireEvent.click(document.getElementById("9.3"));  // toggle again
	expect(document.getElementById("9.3").className).toBe('gCellLand');
	
	fireEvent.click(document.getElementById("9.4"));
	expect(document.getElementById("9.4").className).toBe('gCellLand');
	
	fireEvent.click(document.getElementById("9.7"));
	expect(document.getElementById("9.7").className).toBe('gCellLand');
	
	expect(document.getElementById("9.5").className).toBe('gCellWater');
	expect(document.getElementById("9.6").className).toBe('gCellWater');
	
	fireEvent.click(document.getElementById("9.7"));
	expect(document.getElementById("9.7").className).toBe('gCell');
	
	expect(document.getElementById("9.5").className).toBe('gCell');
	expect(document.getElementById("9.6").className).toBe('gCell');

	//screen.debug();
  });
});


describe('Trap 2', () => {
  test('Renders trap component (12 x 12)', () => {
	render(<Trap rows={12} cols={12}/>);
	
	expect(screen.getByText('Trapped Water Calculator')).toBeInTheDocument();
	expect(screen.getByText('Squares containing water: 0')).toBeInTheDocument();
	expect(screen.getByText('Clear Grid')).toBeInTheDocument();
	expect(document.getElementById("11.11")).toBeInTheDocument();
	expect(document.getElementById("12.11")).toBeNull();
	expect(document.getElementById("11.12")).toBeNull();
	//screen.debug();
  });
});

describe('Trap 3', () => {
  test('Renders trap component (6 x 6)', () => {
	render(<Trap rows={6} cols={6}/>);
	
	expect(screen.getByText('Trapped Water Calculator')).toBeInTheDocument();
	expect(screen.getByText('Squares containing water: 0')).toBeInTheDocument();
	expect(screen.getByText('Clear Grid')).toBeInTheDocument();
	expect(document.getElementById("5.5")).toBeInTheDocument();
	expect(document.getElementById("6.5")).toBeNull();
	expect(document.getElementById("5.6")).toBeNull();
	//screen.debug();
  });
});


describe('Trap 4', () => {
  test('Renders trap component (10 x 10) - bad dimension parms are ignored', () => {
	render(<Trap rows={-3} cols={101}/>);
	
	expect(screen.getByText('Trapped Water Calculator')).toBeInTheDocument();
	expect(screen.getByText('Squares containing water: 0')).toBeInTheDocument();
	expect(screen.getByText('Clear Grid')).toBeInTheDocument();
	expect(document.getElementById("9.9")).toBeInTheDocument();
	expect(document.getElementById("10.9")).toBeNull();
	expect(document.getElementById("9.10")).toBeNull();
	//screen.debug();
  });
});


describe('Trap 5', () => {
  test('Renders trap component with rectangular grid (16 x 10)', () => {
	render(<Trap rows={16} cols={10}/>);
	
	expect(screen.getByText('Trapped Water Calculator')).toBeInTheDocument();
	expect(screen.getByText('Squares containing water: 0')).toBeInTheDocument();
	expect(screen.getByText('Clear Grid')).toBeInTheDocument();
	expect(screen.getByRole('button')).toBeInTheDocument();
	expect(document.getElementById("9.9")).toBeInTheDocument();
	expect(document.getElementById("16.9")).toBeNull();
	expect(document.getElementById("9.10")).toBeNull();

	expect(document.getElementById("9.3").className).toBe('gCell');
	fireEvent.click(document.getElementById("9.3"));
	expect(document.getElementById("9.3").className).toBe('gCellLand');
	
	fireEvent.click(document.getElementById("9.3"));  // toggle 
	expect(document.getElementById("9.3").className).toBe('gCell');  

	fireEvent.click(document.getElementById("9.3"));  // toggle again
	expect(document.getElementById("9.3").className).toBe('gCellLand');
	
	fireEvent.click(document.getElementById("9.4"));
	expect(document.getElementById("9.4").className).toBe('gCellLand');
	
	fireEvent.click(document.getElementById("9.7"));
	expect(document.getElementById("9.7").className).toBe('gCellLand');
	
	expect(document.getElementById("9.5").className).toBe('gCellWater');
	expect(document.getElementById("9.6").className).toBe('gCellWater');
	expect(document.getElementById("15.5").className).toBe('gCellWater');
	expect(document.getElementById("15.6").className).toBe('gCellWater');
	
	fireEvent.click(document.getElementById("15.7"));
	expect(document.getElementById("9.7").className).toBe('gCell');
    expect(document.getElementById("15.7").className).toBe('gCell');
	
	expect(document.getElementById("9.5").className).toBe('gCell');
	expect(document.getElementById("9.6").className).toBe('gCell');
	expect(document.getElementById("15.5").className).toBe('gCell');
	expect(document.getElementById("15.6").className).toBe('gCell');

	//screen.debug();
  });
});

