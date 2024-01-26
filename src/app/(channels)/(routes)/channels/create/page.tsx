import ChannelForm from "@/app/(channels)/_components/channel-form"

export default function ChannelsCreatePage() {
  return (
    <div className="max-w-xl m-auto">
      <h1 className="text-2xl font-medium mb-3">Create new channel</h1>
      <p className="text-gray-500 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc
        mi, porta pellentesque mauris non, consequat elementum nulla.
      </p>
      <ChannelForm />
    </div>
  )
}
