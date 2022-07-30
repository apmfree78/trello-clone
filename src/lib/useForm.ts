// custom hook to handle form values
import { useEffect, useState, ChangeEvent } from 'react';
interface inputProps {
  title: string;
  description: string;
}

export default function useForm(
  initial: inputProps = { title: '', description: '' }
) {
  const [inputs, setInputs] = useState(initial);

  /*  useEffect(() => {
    // this functions runs when things we are watching change
    setInputs(initial);
  }, [initial]); */

  function handleChange(e: any): void {
    let { value, name, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    setInputs({
      ...inputs, // copying existing state
      [name]: value, // updating name field with inputed 'value'
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState: inputProps = { title: '', description: '' };
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
