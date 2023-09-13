export class HashManagerMock {

    public hash = async (plaintext: string): Promise<string> => {
        return 'hash-mock'
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        
        switch (plaintext) {
            case 'flavia123':
                return hash === "hash-mock-flavia"

            case 'izabela123':
                return hash === "hash-mock-izabela"
            default:
                return false
        }
    }
}