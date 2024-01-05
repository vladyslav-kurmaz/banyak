import './SearchForStack.scss'

// Watch redux searc implementing

const handleStackFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
  console.log(e.currentTarget.value)
}

function SearchForStack() {
  return (
    <div onChange={handleStackFilterChange}>
      <input type="text" placeholder="Технологія"></input>
      <button className="test">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle cx="18" cy="18" r="12" fill="#1C145E" />
          <rect
            x="24.9302"
            y="19.27"
            width="13"
            height="8"
            transform="rotate(45 24.9302 19.27)"
            fill="#1C145E"
          />
          <circle cx="18" cy="18" r="6" fill="#FCFCFC" />
        </svg>
      </button>
    </div>
  )
}

export default SearchForStack
