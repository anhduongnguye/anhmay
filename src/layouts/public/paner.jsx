function Paner({ company }) {
  return (
    <>
      {company != null && (
        <div>
          <div className="w-full aspect-[3/1] rounded-2xl overflow-hidden">
            <img
              src={company.thumbnail}
              alt="image.alt"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      )
      }
    </>
  )
}

export default Paner;