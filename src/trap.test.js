
import React from 'react';
import { render , screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
 
import Trap from './trap';
 
describe('Trap', () => {
  test('Renders trap component (default size: 10 x 10)', () => {
	render(<Trap />);
	
	expect(screen.getByText('Trapped Water Calculator')).toBeInTheDocument();
	expect(screen.getByText('Squares containing water: 0')).toBeInTheDocument();
	expect(screen.getByText('Clear Grid')).toBeInTheDocument();
	screen.debug();
  });
});


describe('Trap', () => {
  test('Renders trap component (12 x 12)', () => {
	render(<Trap rows={12} cols={12}/>);
	
	expect(screen.getByText('Trapped Water Calculator')).toBeInTheDocument();
	expect(screen.getByText('Squares containing water: 0')).toBeInTheDocument();
	expect(screen.getByText('Clear Grid')).toBeInTheDocument();
	//screen.debug();
  });
});
