import { render, screen } from "@testing-library/react"

import Welcome from "@components/Welcome"

describe("Home Component", () => {
  it("render headline", () => {
    const name = "Anton!"
    const { container } = render(<Welcome name={name} />)
    expect(container.querySelector("h1")).toBeInTheDocument()
  })
})
