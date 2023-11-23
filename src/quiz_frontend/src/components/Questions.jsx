
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchQestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const [{ isLoading, serverError }] = useFetchQestion();
  const trace = useSelector(state => state.questions.trace);
  const result = useSelector(state => state.result.result);
  const questions = useSelector(state => state.questions.queue[state.questions.trace]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked, dispatch, trace]);

  useEffect(() => {
    console.log('Questions:', questions);
    console.log('Result:', result);
    console.log('Trace:', trace);
  }, [questions, result, trace]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  }

  if (isLoading) {
    return <h3 className="text-light">Loading...</h3>;
  }

  if (serverError) {
    // Convert the error object to a string
    const errorMessage = serverError.toString();

    // Render the error message
    return <h3 className="text-light">{errorMessage || 'Unknown Error'}</h3>;
  }

  return (
    <div className="questions">
      <h2 className="text-light">{questions?.questions}</h2>

      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />

            <label className="text-primary" htmlFor={`q${i}-option`}>{q}</label>
            <div className={`check ${result && result[trace] === i ? 'checked' : ''}`}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
