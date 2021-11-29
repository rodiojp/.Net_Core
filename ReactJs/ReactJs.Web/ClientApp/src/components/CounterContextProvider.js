import React, { useState } from 'react';
import { CounterContext } from './CounterContext';

export const CounterContextProvider = ({ children }) => {
	const [currentCount, setCurrentCount] = useState(0);

	const incrementCounter = incrementBy => {
		setCurrentCount(currentCount + incrementBy);
	}

	return (
		<CounterContext.Provider value={{ currentCount, incrementCounter }}>
			{children}
		</CounterContext.Provider>
	)
}

