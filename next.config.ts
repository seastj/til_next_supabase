import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[{
      protocol: "https",
      hostname: "nowpnwclkahiucqlchfw.supabase.co",
      // 아래는 생략 가능
      pathname:"/storage/v1/object/public/**"
    }]
  }
};

export default nextConfig;
