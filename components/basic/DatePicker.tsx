import { KeyboardEvent, Reducer, useEffect, useReducer, useRef } from 'react'

interface Month {
  name: string
  shortName: string
  calendarMonthNumber: number
}

interface DatePickerReducerState {
  isOpen: boolean
  date: string
  displayDate: string
  month: number
  year: number
  daysInMonthArr: number[]
  blankDaysArr: number[]
}
const months: { [id: number]: string } = {
  0: '1월',
  1: '2월',
  2: '3월',
  3: '4월',
  4: '5월',
  5: '6월',
  6: '7월',
  7: '8월',
  8: '9월',
  9: '10월',
  10: '11월',
  11: '12월',
}

const monthObj: { [id: number]: Month } = {
  0: {
    name: '1월',
    shortName: '1월',
    calendarMonthNumber: 1,
  },
  1: {
    name: '2월',
    shortName: '2월',
    calendarMonthNumber: 2,
  },
  2: {
    name: '3월',
    shortName: '3월',
    calendarMonthNumber: 3,
  },
  3: {
    name: '4월',
    shortName: '4월',
    calendarMonthNumber: 4,
  },
  4: {
    name: '5월',
    shortName: '5월',
    calendarMonthNumber: 5,
  },
  5: {
    name: '6월',
    shortName: '6월',
    calendarMonthNumber: 6,
  },
  6: {
    name: '7월',
    shortName: '7월',
    calendarMonthNumber: 7,
  },
  7: {
    name: '8월',
    shortName: '8월',
    calendarMonthNumber: 8,
  },
  8: {
    name: '9월',
    shortName: '9월',
    calendarMonthNumber: 9,
  },
  9: {
    name: '10월',
    shortName: '10월',
    calendarMonthNumber: 10,
  },
  10: {
    name: '11월',
    shortName: '11월',
    calendarMonthNumber: 11,
  },
  11: {
    name: '12월',
    shortName: '12월',
    calendarMonthNumber: 12,
  },
}

interface CalendarDay {
  name: string
  shortName: string
  calendarWeekdayNumber: number
}

const dayObj: { [id: number]: CalendarDay } = {
  0: {
    name: '일요일',
    shortName: '일',
    calendarWeekdayNumber: 0,
  },
  1: {
    name: '월요일',
    shortName: '월',
    calendarWeekdayNumber: 1,
  },
  2: {
    name: '화요일',
    shortName: '화',
    calendarWeekdayNumber: 2,
  },
  3: {
    name: '수요일',
    shortName: '수',
    calendarWeekdayNumber: 3,
  },
  4: {
    name: '목요일',
    shortName: '목',
    calendarWeekdayNumber: 4,
  },
  5: {
    name: '금요일',
    shortName: '금',
    calendarWeekdayNumber: 5,
  },
  6: {
    name: '토요일',
    shortName: '토',
    calendarWeekdayNumber: 6,
  },
}

const days = ['일', '월', '화', '수', '목', '금', '토']

type DatePickeReducerAction =
  | { type: 'SET_INIT_STATE' }
  | { type: 'IS_OPEN'; isOpen: boolean }
  | { type: 'SET_DATE'; dayNumber: number }
  | { type: 'ADD_MONTH' }
  | { type: 'SUBTRACT_MONTH' }

const initState: DatePickerReducerState = {
  isOpen: false,
  date: '',
  displayDate: '',
  month: 0,
  year: 0,
  daysInMonthArr: [],
  blankDaysArr: [],
}

const datePickerReducer: React.Reducer<
  DatePickerReducerState,
  DatePickeReducerAction
> = (state, action) => {
  switch (action.type) {
    case 'SET_INIT_STATE': {
      const today = new Date()
      const month = today.getMonth()
      const year = today.getFullYear()

      const dayOfWeek = new Date(year, month).getDay()
      const weekday = dayObj[dayOfWeek].calendarWeekdayNumber
      const displayDate = createDisplayDay(
        new Date(year, month, today.getDate()),
      )
      const date = formatYearsMonthDay(new Date(year, month, today.getDate()))

      // Get last day number of the previous actual month
      const daysInMonth = new Date(year, month, 0).getDate()

      // Get the number (0-6) on which the actual month starts
      let blankDaysArr: number[] = []
      for (let i = 1; i <= weekday; i++) {
        blankDaysArr.push(i)
      }

      let daysInMonthArr: number[] = []
      for (let i = 1; i < daysInMonth; i++) {
        daysInMonthArr.push(i)
      }

      return {
        ...state,
        date,
        displayDate,
        month,
        year,
        daysInMonthArr,
        blankDaysArr,
      }
    }

    case 'IS_OPEN': {
      return {
        ...state,
        isOpen: action.isOpen,
      }
    }

    case 'SET_DATE': {
      const dateToFormat = new Date(state.year, state.month, action.dayNumber)
      const date = formatYearsMonthDay(dateToFormat)
      const displayDate = createDisplayDay(dateToFormat)
      return {
        ...state,
        date,
        displayDate,
        isOpen: false,
      }
    }

    case 'ADD_MONTH': {
      let newYear: number
      let newMonth: number
      if (state.month === 11) {
        newMonth = 0
        newYear = state.year + 1
      } else {
        newMonth = state.month + 1
        newYear = state.year
      }

      const newMonthFirstWeekdayNumber = new Date(newYear, newMonth, 1).getDay()
      const firstWeekdayNumber =
        dayObj[newMonthFirstWeekdayNumber].calendarWeekdayNumber
      const daysInMonth = new Date(newYear, newMonth + 1, 0).getDate()

      let blankDaysArr = []
      for (let i = 1; i <= firstWeekdayNumber; i++) {
        blankDaysArr.push(i)
      }

      let daysInMonthArr = []
      for (let i = 1; i <= daysInMonth; i++) {
        daysInMonthArr.push(i)
      }

      return {
        ...state,
        month: newMonth,
        year: newYear,
        daysInMonthArr,
        blankDaysArr,
      }
    }

    case 'SUBTRACT_MONTH': {
      let newYear: number
      let newMonth: number
      if (state.month === 0) {
        newMonth = 11
        newYear = state.year - 1
      } else {
        newMonth = state.month - 1
        newYear = state.year
      }

      const newMonthFirstWeekdayNumber = new Date(newYear, newMonth, 1).getDay()
      const firstWeekdayNumber =
        dayObj[newMonthFirstWeekdayNumber].calendarWeekdayNumber
      const daysInMonth = new Date(newYear, newMonth + 1, 0).getDate()

      let blankDaysArr = []
      for (let i = 1; i <= firstWeekdayNumber; i++) {
        blankDaysArr.push(i)
      }

      let daysInMonthArr = []
      for (let i = 1; i <= daysInMonth; i++) {
        daysInMonthArr.push(i)
      }

      return {
        ...state,
        year: newYear,
        month: newMonth,
        daysInMonthArr,
        blankDaysArr,
      }
    }

    default: {
      throw Error('Error un reducer')
    }
  }
}

const createDisplayDay = (date: Date): string => {
  const year = date.getFullYear()
  const monthShortName = monthObj[date.getMonth()].shortName
  const day = ('0' + date.getDate()).slice(-2)
  const dayShortName = dayObj[date.getDay()].shortName

  return `${year}년 ${monthShortName} ${day}일 (${dayShortName}) `
}

const formatYearsMonthDay = (date: Date): string => {
  return (
    date.getFullYear() +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + date.getDate()).slice(-2)
  )
}

const DatePicker = ({ setDate }: { setDate: (date: string) => void }) => {
  const [state, dispatch] = useReducer<
    Reducer<DatePickerReducerState, DatePickeReducerAction>
  >(datePickerReducer, initState)
  const displayDateRef = useRef<HTMLInputElement>(null)
  const daysDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch({
      type: 'SET_INIT_STATE',
    })
  }, [])

  useEffect(() => {
    setDate(state.displayDate)
  }, [setDate, state.displayDate])

  const isToday = (dayNumber: number) => {
    const today = new Date()
    const day = new Date(state.year, state.month, dayNumber)

    return today.toDateString() === day.toDateString() ? true : false
  }

  const handleDatePickerKeydown = (event: KeyboardEvent) => {
    if (event.charCode === 0) {
      dispatch({ type: 'IS_OPEN', isOpen: false })
    }
  }

  const toggleDisplayDateFocus = (): void => {
    const displayDate = displayDateRef.current
    if (!displayDate) return
    if (displayDate.classList.contains('shadow-outline')) {
      displayDate.classList.remove('shadow-outline')
      displayDate.blur()
    } else {
      displayDate.classList.add('shadow-outline')
      displayDate.focus()
    }
    const daysDiv = daysDivRef.current
    daysDiv!.focus()
  }

  return (
    <div className="antialiased sans-serif">
      <div className="container mx-auto px-4  ">
        <div className="mb-5 w-64">
          <label
            htmlFor="datepicker"
            className="font-medium mb-1 text-gray-700 block"
          >
            날짜
          </label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={state.displayDate}
              ref={displayDateRef}
              onClick={() => {
                dispatch({ type: 'IS_OPEN', isOpen: !state.isOpen })
                toggleDisplayDateFocus()
              }}
              onKeyDown={(event) => handleDatePickerKeydown(event)}
              onBlur={() => {
                dispatch({ type: 'IS_OPEN', isOpen: false })
                toggleDisplayDateFocus()
              }}
              className="w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm text-gray-600 font-medium outline-none focus:outline-none focus:shadow-outline"
              placeholder="Select date"
            />

            <div className="absolute top-0 right-0 px-3 py-2">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div
              className={`focus:outline-none duration-200 mt-12 bg-white rounded-lg shadow p-4 absolute top-0 left-0 ${
                !state.isOpen ? 'invisible opacity-0' : 'visible opacity-100'
              }`}
              style={{ width: '17rem' }}
              ref={daysDivRef}
              tabIndex={-1}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-lg font-bold text-gray-800">
                    {months[state.month]}
                  </span>
                  <span className="ml-1 text-lg text-gray-600 font-normal">
                    {state.year}
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full focus:shadow-outline focus:outline-none mr-1`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => dispatch({ type: 'SUBTRACT_MONTH' })}
                  >
                    <svg
                      className="h-6 w-6 text-gray-500 inline-flex"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full focus:shadow-outline focus:outline-none`}
                    onClick={() => dispatch({ type: 'ADD_MONTH' })}
                  >
                    <svg
                      className="h-6 w-6 text-gray-500 inline-flex"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap mb-3 -mx-1">
                {days.map((day, index) => (
                  <div key={index} style={{ width: '14.26%' }} className="px-1">
                    <div
                      className={
                        ' font-medium text-center text-xs ' +
                        (day === 'Sun' ? 'text-red-500' : 'text-gray-800')
                      }
                    >
                      {day}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap -mx-1">
                {state.blankDaysArr.map((day) => (
                  <div
                    key={day}
                    style={{ width: '14.28%' }}
                    className="text-center border p-1 border-transparent text-sm"
                  />
                ))}
                {state.daysInMonthArr.map((dayNumber, index) => (
                  <div
                    key={index}
                    style={{ width: '14.28%' }}
                    className="px-1 mb-1"
                  >
                    <div
                      onClick={() => {
                        dispatch({
                          type: 'SET_DATE',
                          dayNumber,
                        })
                        toggleDisplayDateFocus()
                      }}
                      onMouseDown={(event) => event.preventDefault()}
                      className={`cursor-pointer text-center text-sm  rounded-full leading-loose transition ease-in-out duration-100 
                                                ${
                                                  isToday(dayNumber)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'text-gray-700 hover:bg-blue-200'
                                                }`}
                    >
                      {dayNumber}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatePicker
