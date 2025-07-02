import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
	console.log("🔐 Checking auth:", req.auth());
	if (!req.auth?.userId) {
		return res.status(401).json({ message: "Unauthorized - you must be logged in" });
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
	try {
        const { userId } = req.auth?.userId;

		const currentUser = await clerkClient.users.getUser(userId);
        
		const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

		if (!isAdmin) {
            console.warn("❌ Not an admin");
			return res.status(403).json({ message: "Unauthorized - you must be an admin" });
		}

		next();
	} catch (error) {
        console.error("❌ requireAdmin error:", error);
		next(error);
	}
};
