import { render } from "@testing-library/react"

import Home from "@pages/index"

describe("Home Component", () => {
  it("render headline", () => {
    const { container } = render(<Home />)

    expect(container.querySelector("h1")).toBeInTheDocument()
  })
})
