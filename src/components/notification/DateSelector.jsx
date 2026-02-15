import { useState } from 'react'
import Datepicker from 'tailwind-datepicker-react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNotification } from '../../contexts/NotifcationContext'

const DateSelector = () => {
  const options = {
    title: 'Select a date',
    autoHide: false,
    todayBtn: true,
    clearBtn: true,
    clearBtnText: 'Clear',
    maxDate: null,
    minDate: new Date(new Date().setHours(0, 0, 0, 0)),
    theme: {
      background: 'text-xl text-white bg-[#14385a]',
      todayBtn: '',
      clearBtn: '',
      icons: 'bg-inherit hover:bg-opacity-30  text-white text-xl focus:outline-none',
      text: 'hover:bg-opacity-30 text-white',
      disabledText: 'opacity-40 text-white hover:bg-gray-900',
      input:
        'bg-inherit text-white focus:outline-none hover:cursor-pointer border-none text-md',
      inputIcon: 'text-white',
      selected: 'bg-[#1d5283]',
    },
    icons: {
      prev: () => <span><IoIosArrowRoundBack /></span>,
      next: () => <span><IoIosArrowRoundForward /></span>,
    },
    datepickerClassNames: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10',
    defaultDate: new Date(),
    language: 'en',
    disabledDates: [],
    weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    inputNameProp: 'date',
    inputIdProp: 'date',
    inputPlaceholderProp: 'Select a date',
    inputDateFormatProp: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  }

  const { setSelectedDate } = useNotification()
  const [show, setShow] = useState(false)

  const handleChange = selectedDate => {
    setSelectedDate(selectedDate)
    setShow(false)
  }

  const handleClose = state => {
    setShow(state)
  }

  const handleActionButtons = () => {
    setShow(false)
  }

  return (
    <Datepicker
      options={options}
      onChange={handleChange}
      show={show}
      setShow={handleClose}
      onToday = {handleActionButtons}
      onClear = {handleActionButtons}
    />
  )
}

export default DateSelector
