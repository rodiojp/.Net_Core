import React, { useState } from 'react';
import { CounterContext } from './CounterContext';

export const CounterContextProvider = ({ children }) => {
	const [currentCount, setNumberOfClicks] = useState(0);

	const incrementCounter = incrementBy => {
		setNumberOfClicks(currentCount + incrementBy);
	}

	return (
		<CounterContext.Provider value={{ currentCount, incrementCounter }}>
			{children}
		</CounterContext.Provider>
	)
}

